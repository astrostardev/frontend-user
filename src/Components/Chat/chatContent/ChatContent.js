import React, { useState, useEffect, useRef, useCallback } from "react";
import MessageSelf from "./MessageSelf";
import MessageOthers from "./MessageOthers";
import "./chatContent.css";
import { IconButton } from "@mui/material";
import { IoAddOutline } from "react-icons/io5";
import { AiOutlineSend } from "react-icons/ai";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { BiSolidMicrophone } from "react-icons/bi";
import {
  fetchChatFail,
  fetchChatRequest,
  fetchChatSuccess,
  sendChatFail,
  sendChatRequest,
  sendChatSuccess,
} from "../../../Slice/conversationSlice";
import Timer from "../Timer";
import { isAstrologerBusy } from "../../../action/astrologerAction";
import { extractDayAndDate } from "../../../utils/extractTime";
import { logDOM } from "@testing-library/react";
import { AudioProvider } from "../../../context/AudioContext";
const ENDPOINT = process.env.REACT_APP_SOCKET_URL;

function ChatContent({ setTime, timeStopped, astrologer, isTimer,time }) {
  const { user } = useSelector((state) => state.authState);
  const { isRunning } = useSelector((state) => state.timerState);
  const { id } = useParams();
  const splitId = id.split("+")[0].trim();
  const [allMessages, setAllMessages] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const [isThrottled, setIsThrottled] = useState(false);
  const throttlingDelay = 1000;
  const [socket, setSocket] = useState(null);
  const [streaming, setStreaming] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [currentHeader, setCurrentHeader] = useState('');
  const scrollRef = useRef(null);
  const messagesEndRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStopTimer = (stopTimerValue) => {
    timeStopped(stopTimerValue);
  };
  useEffect(() => {
    if (isTimer && isRunning) {
      alert("Chat Time Ended Please Recharge", navigate(`/home`));
      dispatch(isAstrologerBusy(!isTimer, splitId));
    }
  }, [isTimer, dispatch, navigate, splitId, isRunning]);

  const handleTimer = useCallback(() => {
    const stopTimerValue = false; // Example value
    timeStopped(stopTimerValue);
  }, [timeStopped]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
//scroll to show day details 
useEffect(() => {
  const handleScroll = () => {
    const scrollTop = scrollRef.current.scrollTop;
    // Logic to determine which header should be shown based on scroll position
    const newHeader = getCurrentHeader(scrollTop);
    setCurrentHeader(newHeader);
  };

  const ref = scrollRef.current;
  ref?.addEventListener('scroll', handleScroll);

  return () => {
    ref?.removeEventListener('scroll', handleScroll);
  };
}, []);

const getCurrentHeader = (scrollTop) => {
const showtime = extractDayAndDate(time)
console.log('show time',showtime);
setCurrentHeader(showtime)
};
  //initialising WebSocket
  useEffect(() => {
    const newSocket = new WebSocket(ENDPOINT);

    newSocket.onopen = () => {
      console.log("Connected to WebSocket server");

      const setupMessage = {
        type: "setup",
        userId: user?._id,
      };
      newSocket.send(JSON.stringify(setupMessage));
    };

    newSocket.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [user?._id]);

  //get messages
  useEffect(() => {
    const getChatMessages = async () => {
      try {
        dispatch(fetchChatRequest()); // Dispatch action to indicate message fetching has started

        // Emit a WebSocket message to request chat messages
        socket.send(
          JSON.stringify({
            type: "get messages",
            room: splitId,
            userId: user?._id,
          })
        );
      } catch (error) {
        dispatch(fetchChatFail(error.message));
      }
    };

    const handleMessageEvent = (event) => {
      const messageData = JSON.parse(event.data);
      if (messageData.type === "messages") {
        console.log("messageData Get", messageData.payload);
        const messages = dispatch(fetchChatSuccess(messageData.messages));

        setAllMessages(messages.payload); // Dispatch action to update messages in the state
      } else if (messageData.type === "new message") {
        const messages = dispatch(
          fetchChatSuccess((prevMessage = []) => [...prevMessage, messageData])
        ); // Dispatch action with messageData as payload
        setAllMessages(messages.payload); // Update state with messages payload
      } else if (messageData.type === "error") {
        dispatch(fetchChatFail(messageData.message));
      }
    };

    if (socket) {
      socket.addEventListener("open", () => {
        console.log("WebSocket connection is open.");
        console.log("paramsId", splitId);
        getChatMessages(); // Call the function to fetch chat messages
      });

      socket.addEventListener("message", handleMessageEvent);

      socket.addEventListener("close", () => {
        console.log("WebSocket connection is closed.");
      });
    } else {
      console.error("WebSocket connection is not open.");
    }

    // Cleanup function
    return () => {
      if (socket) {
        socket.removeEventListener("message", handleMessageEvent);
      }
    };
  }, [dispatch, socket, splitId, user]);


    // Function to start streaming audio
    const startStreaming = () => {
      console.log("startStreaming called");
      console.log("socket:", socket);
    
      try {
        if (socket && socket.readyState === WebSocket.OPEN) {
          console.log("WebSocket connection is open. Starting streaming.");
    
          navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
              console.log("getUserMedia success");
              const mediaRecorder = new MediaRecorder(stream);
    
              mediaRecorder.ondataavailable = (event) => {
                const audioBlob = new Blob([event.data], { type: "audio/webm" });
                const reader = new FileReader();
    
                reader.onload = async () => {
                  try {
                    const base64Data = reader.result; // Data URL including MIME type and base64-encoded data
                    const formData = new FormData();
    
                    // Add metadata and the audio file to the form
                    formData.append("from", user._id);
                    formData.append("to", splitId);
                    formData.append("audio", audioBlob, "audio_message.webm");
    
                    const response = await fetch(
                      'http://localhost:8001/api/v1/message/send/audio',
                      {
                        method: "POST",
                        // Don't set Content-Type for FormData; let the browser set it
                        body: formData,
                      }
                    );
    
                    if (!response.ok) {
                      throw new Error(`Failed to upload audio: ${response.statusText}`);
                    }
    
                    console.log("Audio sent successfully");
    
                    // Send data via WebSocket
                    socket.send(
                      JSON.stringify({
                        type: "new audio",
                        room: splitId,
                        userId:user?._id,
                        audio: base64Data, // Sending the base64-encoded data URL
                      })
                    );
                  } catch (error) {
                    console.error("Error during file read and fetch:", error);
                  }
                };
    
                reader.readAsDataURL(audioBlob); // Convert Blob to Data URL
              };
    
              mediaRecorder.start();
              setStreaming(true);
              setMediaRecorder(mediaRecorder);
            })
            .catch((error) => {
              console.error("Error accessing microphone", error);
            });
        } else {
          console.error("Socket connection is not open.");
        }
      } catch (error) {
        console.error("Error during audio streaming:", error);
      }
    };
    
    // Function to stop streaming audio
    const stopStreaming = () => {
      if (mediaRecorder) {
        mediaRecorder.stop();
         setStreaming(false);
         setMediaRecorder(null);
      }
    };
  

  // send message function using throttling
  const sendMessage = async () => {
    try {
      if (isThrottled) {
        console.log("Message sending is throttled. Please wait.");
        return;
      }

      setIsThrottled(true); // Throttle the function
      dispatch(sendChatRequest()); // Dispatch action to indicate message sending has started

      // Emit a WebSocket message to send a new chat message
      socket.send(
        JSON.stringify({
          type: "new message",
          room: splitId,
          userId: user?._id,
          message: messageContent,
        })
      );

      // Listen for WebSocket messages containing chat messages
      socket.addEventListener("message", (event) => {
        const messageData = JSON.parse(event.data);
        if (messageData.type === "new message") {
          // Dispatch action to update messages in the state
          dispatch(sendChatSuccess(messageData));
        } else if (messageData.type === "error") {
          dispatch(sendChatFail(messageData?.message));
        }
      });

      // Wait for the throttling delay before resetting isThrottled
      setTimeout(() => {
        setIsThrottled(false); // Reset the throttling
      }, throttlingDelay);
    } catch (error) {
      dispatch(sendChatFail(error.message));
    }
  };

  useEffect(() => {
    if (socket) {
      socket.addEventListener("open", () => {
        console.log("WebSocket connection is open.");
        console.log("paramsId", splitId);
        // No need to call any function here
      });

      socket.addEventListener("close", () => {
        console.log("WebSocket connection is closed.");
      });
    } else {
      console.error("WebSocket connection is not open.");
    }

    // Cleanup function
    return () => {
      // Remove event listeners or perform any cleanup if needed
    };
  }, [socket, splitId, user?._id]);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  return (
    <div className="main__chatcontent">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ ease: "anticipate", duration: "0.3" }}
        >
          <div className="current-chatting-user">
            <p className="con-icon">{astrologer?.astrologer?.displayname[0]}</p>
            <div className="header-text">
              <p className="con-title">{astrologer?.astrologer?.displayname}</p>

              <p className="con-timeStamp">online</p>
            </div>
            {/* <IconButton style={{ background: "#F3F3F3" }} className="btn-nobg">
              End
            </IconButton> */}
            <div className="timer">
              <Timer setTime={setTime} onStopTimer={handleStopTimer} />
            </div>
          </div>
          {/* Your UI elements */}
          
          <div className="content__body">
            <div className="chat__items">
            <AudioProvider>
            {allMessages?.map((message, index) =>
              <>
              
             {message.senderId === user._id ? (
         
             <MessageSelf key={index} props={message} audio={message.audio} />
                ) : message.receiverId === user._id ?(
                  <MessageOthers
                    key={index}
                    props={message}
                    audio={message.audio} 
                    astrologer={astrologer}
                  />
                ):null

              }
              </>
            )}
            </AudioProvider>

          
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="content__footer">
            <div className="sendNewMessage">
              <IconButton>
                <IoAddOutline />
              </IconButton>
              <input
                type="text"
                placeholder="Type a message here"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                onKeyDown={(event) => {
                  if (event.code === "Enter") {
                    sendMessage();
                    setMessageContent("");
                    
                  }
                }}
                // style={{ pointerEvents: user?.balance ? 'none' : 'auto' }}
              />
              <button
                onClick={() => {
                  sendMessage(splitId, user?._id, messageContent);
                  setMessageContent("");
                }}
                className="btnSendMsg"
                id="sendMsgBtn"
              >
                <AiOutlineSend />
              </button>
              <button className="btnSendMsg" id="sendMsgBtn">
                {streaming ? (
                  <BiSolidMicrophone onMouseUp={stopStreaming} />
                ) : (
                  <BiSolidMicrophone
                    className="btnSendMsg"
                    onMouseDown={startStreaming} // Removed parentheses to prevent immediate invocation
                  />
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default ChatContent;
