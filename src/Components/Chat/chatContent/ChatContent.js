import React, { useState, useEffect, useRef } from "react";
import MessageSelf from "./MessageSelf";
import MessageOthers from "./MessageOthers";
import "./chatContent.css";
import { IconButton } from "@mui/material";
import { IoAddOutline } from "react-icons/io5";
import { AiOutlineSend } from "react-icons/ai";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:8001";
var socket;
function ChatContent(props) {
  const { user, token } = useSelector((state) => state.authState);
  const [refresh, setRefresh] = useState(false);
  const [astrologer, setAstrologer] = useState(null);
  const { id } = useParams();
  const splitId = id.split("+")[0].trim();
  const [allMessages, setAllMessages] = useState(null);
  const [sendmsg, setSendMsg] = useState(null);
  const [allMessagesCopy, setAllMessagesCopy] = useState(null);
  const [message, setMessageContent] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);
  const messagesEndRef = useRef();
  const [latestMsg, setLatestMsg] = useState(null);
  //adding automating scroll bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  //using socket io
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => {
      setSocketConnectionStatus(!socketConnectionStatus);
    });
  }, []);
 useEffect(()=>{
  const getAllMsg = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/user_messages/${splitId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      socket.emit("join chat", splitId);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let data = await response.json();

      setAllMessages(data);
      setLoaded(true);
      setAllMessagesCopy(allMessages);
      console.log('latst',latestMsg);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  getAllMsg();
 },[allMessages,token,splitId])

  //send message function
  const sendMessage = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/message/send/astrologer/${splitId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      // Check if response is not ok
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse response body as JSON
      const data = await response.json();

      // Log the response data
      console.log("response data", data);

      socket.emit("new message", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //header part of selected astrologer
  useEffect(() => {
    const getAstrologer = async () => {
      try {
        let response = await fetch(
          `${process.env.REACT_APP_URL}/api/v1/astrologer/getAstrologer/${splitId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let data = await response.json();
        // console.log("astrologer", data.astrologer);
        setAstrologer(data.astrologer);
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getAstrologer();
  }, [splitId]);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  // Scroll to bottom when window is loaded
  useEffect(() => {
    scrollToBottom();
  }, []);
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
            <p className="con-icon">{astrologer?.displayname[0]}</p>
            <div className="header-text">
              <p className="con-title">{astrologer?.displayname}</p>
      
              <p className="con-timeStamp">online</p>
            </div>
            <IconButton style={{ background: "#F3F3F3" }} className="btn-nobg">
              End
            </IconButton>
          </div>

          <div className="content__body">
            <div className="chat__items">
              {allMessages?.map((message, index) => (
                <React.Fragment key={`message_${index}`}>
                  {message.senderId === user?._id ? (
                    <MessageSelf props={message} key={index} />
                  ) : (
                    <MessageOthers props={message} key={index} />
                  )}
                </React.Fragment>
              ))}
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
                onChange={(e) => {
                  setMessageContent(e.target.value);
                }}
                value={message}
                onKeyDown={(event) => {
                  if (event.code === "Enter") {
                    sendMessage();
                    setMessageContent("");
                    setRefresh(!refresh);
                  }
                }}
              />
              <button
                onClick={() => {
                  sendMessage();
                  setMessageContent("");
                  setRefresh(!refresh);
                }}
                className="btnSendMsg"
                id="sendMsgBtn"
              >
                <AiOutlineSend />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default ChatContent;
