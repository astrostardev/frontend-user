import React, { useEffect, useState } from "react";
import "./chatBody.css";
import Sidebar from "../SideBar/Sidebar";
import { Sidebar as AppSiderbar } from "../../../../src/Pages/Sidebar";
import ChatOffcanvas from "../offCanvas/ChatOffcanvas";
import OffCanvasNav from "../../../../src/Pages/OffCanvasNav";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Welcome from "../chatPages/Welcome";
import ChatContent from "../chatContent/ChatContent";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import { UserRechargeDetailModal } from "../../../../src/Pages/Sidebar";
import { getBalanceAfterChat, saveChatDetailsToAstrologerDb } from "../../../action/userAction";
import {
  fetchChatFail,
  fetchChatRequest,
  fetchChatSuccess,
} from "../../../../src/Slice/conversationSlice";
import { isAstrologerBusy } from "../../../action/astrologerAction";
import { setIsRunning } from "../../../../src/Slice/timerSlice";
const ENDPOINT = process.env.REACT_APP_SOCKET_URL;

const ChatBody = React.memo(({ onStopTimer, isTimer }) => {
  const { user, token } = useSelector((state) => state.authState);
  const { id } = useParams();
  const splitId = id.split("+")[0].trim();
  const [socket, setSocket] = useState(null);
  const [recentMessage, setAllMessages] = useState(null);
  const [astrologer, setAstrologer] = useState(null);
  const [userRechargeShow, setUserRechargeShow] = useState(false);
  const [time, setTime] = useState("");
  const [show, setShow] = useState(true);
  const[chats,setChats]=useState(null)
  const handleClose = () => setShow(false);
  //chatPrice for User
  const userBal = user?.balance;
  const chatAmount = astrologer?.astrologer?.displaychat;
  const fivemins = 5 * chatAmount;
  const tenmins = 10 * chatAmount;
  const fifteenmins = 15 * chatAmount;


  //chatPrice for AStrologer
  const originalAmount = astrologer?.astrologer?.chat;
  const originalFivemins = 5 * originalAmount;
  const originalTenmins = 10 * originalAmount;
  const originalFifteenmins = 15 * originalAmount;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userID = user?._id;
  const { isRunning } = useSelector((state) => state.timerState);
  const date = new Date();
  const astrologerName = astrologer?.astrologer?.displayname;
  const name = user?.name
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
        const messages = dispatch(fetchChatSuccess(messageData.messages));
        setAllMessages(messages.payload); // Dispatch action to update messages in the state
      } else if (messageData.type === "new message") {
        const messages = dispatch(
          fetchChatSuccess((prevMessage = []) => [...prevMessage, messageData])
        ); // Dispatch new Message what i have sent
        setAllMessages(messages.payload); // Dispatch action to update messages in the state
      } else if (messageData.type === "error") {
        dispatch(fetchChatFail(messageData.message));
      }
    };

    if (socket) {
      socket.addEventListener("open", () => {
        console.log("WebSocket connection is open.");

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

  // Show astrologer on side bar
  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/astrologer/getAstrologer/${id}`,
        {
          method: "GET",
        }
      );
      let data = await response.json();
      setAstrologer(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(setIsRunning(false));
  }, [isTimer]);

  function handleTime(time) {
    setTime(time);
  }
//fetch chats between two members
async function getUser() {
  try {
    let response = await fetch(
      `${process.env.REACT_APP_URL}/api/v1/fetch_chat`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({
          id: user._id,
          astroId:splitId
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    let data = await response.json();
    setChats(data?.chats);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

useEffect(() => {
  getUser();
}, []);
const latestMsg = recentMessage && recentMessage.length > 0 
  ? (recentMessage[recentMessage.length - 1].message || recentMessage[recentMessage.length - 1].audio) 
  : 'No messages'; // Fallback in case there are no messages

  return (
    <>
      <div id="fixedbar">
        <AppSiderbar />
      </div>
      <div id="offcanvas">
        <OffCanvasNav />
      </div>

      <UserRechargeDetailModal
        show={userRechargeShow}
        onHide={() => setUserRechargeShow(false)}
      />
      <div>
        {userBal < fivemins ? (
          <Modal show={show} onHide={handleClose}>
            <Modal.Title style={{ textAlign: "center" }}>
              {" "}
              <h2> Insufficient Balance</h2>
            </Modal.Title>
            <Modal.Body>
              <h3>Minimum balance required: &#8377;{fivemins}</h3>
              <p>Please recharge to continue.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => {
                  handleClose();
                  navigate("/home");
                   dispatch(isAstrologerBusy(false,splitId))
                }}
              >
                Close
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  setUserRechargeShow(true);
                  handleClose();
                }}
              >
                Recharge Now
              </Button>
            </Modal.Footer>
          </Modal>
        ) : (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Chat Timing</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Amount Detail</th>
                    <th>Total Amount</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {userBal >= fivemins ? (
                    <tr>
                      <td
                        rowSpan={3}
                        style={{ verticalAlign: "middle", textAlign: "center" }}
                      >
                        chat: &#8377;{chatAmount}/min
                      </td>
                      <td>Amount: &#8377; {fivemins} </td>
                      <td>
                        <Button
                          variant="success"
                          onClick={(e) => {
                            e.preventDefault();
                            if (userBal >= fivemins) {
                              handleClose(fivemins);
                              handleTime(1);
                              dispatch(
                                getBalanceAfterChat(
                                  astrologerName,
                                  splitId,
                                  date,
                                  5,
                                  fivemins,
                                  userID,
                                  token
                                )
                              );
                              dispatch(
                                saveChatDetailsToAstrologerDb(
                                  name,
                                  userID,
                                  date,
                                  5,
                                  originalFivemins,
                                  splitId,
                                  token
                                )
                              );
                            } else {
                              toast.error("Insufficient Balance");
                            }
                          }}
                        >
                          5 mins
                        </Button>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                  {userBal >= tenmins ? (
                    <tr>
                      <td>Amount: &#8377; {tenmins} </td>
                      <td>
                        <Button
                          variant="success"
                          onClick={(e) =>
                            {
                              e.preventDefault();
                          
                              if (userBal >= tenmins) {
                                handleClose(tenmins);
                                handleTime(1);
                                dispatch(
                                  getBalanceAfterChat(
                                    astrologerName,
                                    splitId,
                                    date,
                                    10,
                                    tenmins,
                                    userID,
                                    token
                                  )
                                );
                                dispatch(
                                  saveChatDetailsToAstrologerDb(
                                    name,
                                    userID,
                                    date,
                                    10,
                                    originalTenmins,
                                    splitId,
                                    token
                                  )
                                );
                              } else {
                                toast.error("Insufficient Balance");
                              }
                            }}
                        >
                          10 mins
                        </Button>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}

                  {userBal >= fifteenmins ? (
                    <tr>
                      <td>Amount: &#8377; {fifteenmins} </td>
                      <td>
                        <Button
                          variant="success"
                          onClick={(e) => {
                            e.preventDefault();
                            if (userBal >= fifteenmins) {
                              handleClose(fifteenmins);
                              handleTime(1);
                              dispatch(
                                getBalanceAfterChat(
                                  astrologerName,
                                  splitId,
                                  date,
                                  15,
                                  fifteenmins,
                                  userID,
                                  token
                                )
                              );
                              dispatch(
                                saveChatDetailsToAstrologerDb(
                                  name,
                                  userID,
                                  date,
                                  15,
                                  originalFifteenmins,
                                  splitId,
                                  token
                                )
                              );
                            } else {
                              toast.error("Insufficient Balance");
                            }

                          }}
                        >
                          15 mins
                        </Button>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                </tbody>
              </Table>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>

      <div className="main__chatbody">
        <Sidebar
          latestMsg={latestMsg}
         
          time={
            recentMessage?.length > 0
              ? recentMessage[recentMessage?.length - 1]?.createdAt
              : " "
          }
          astrologer={astrologer}
          timeStopped={onStopTimer}
        />

        <ChatOffcanvas
          latestMsg={
            recentMessage?.length > 0
              ? recentMessage[recentMessage?.length - 1]?.message
              : " "
          }
          time={
            recentMessage?.length > 0
              ? recentMessage[recentMessage?.length - 1]?.createdAt
              : " "
          }
          astrologer={astrologer}
          setTime={time}
          timeStopped={onStopTimer}
        />

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="chat_content"
            element={
              <ChatContent
                setTime={time}
                timeStopped={onStopTimer}
                isTimer={isTimer}
                astrologer={astrologer}
                time={
                  recentMessage?.length > 0
                    ? recentMessage[recentMessage?.length - 1]?.createdAt
                    : " "
                }
              />
            }
          />
        </Routes>
      </div>
    </>
  );
});

export default ChatBody;
