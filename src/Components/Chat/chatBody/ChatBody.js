import React, { useEffect, useState } from "react";
import "./chatBody.css";
import Sidebar from "../SideBar/Sidebar";
import AppSiderbar from "../../../../src/Pages/Sidebar";
import ChatOffcanvas from "../offCanvas/ChatOffcanvas";
import OffCanvasNav from "../../../../src/Pages/OffCanvasNav";
import { Route, Routes, useParams } from "react-router-dom";
import Welcome from "../chatPages/Welcome";
import ChatContent from "../chatContent/ChatContent";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchChatFail,
  fetchChatRequest,
  fetchChatSuccess,
  sendChatFail,
  sendChatRequest,
  sendChatSuccess,
} from "../../../slice/conversationSlice";

const ENDPOINT = "ws://localhost:8001";

function ChatBody({ showChat }) {
  const { user } = useSelector((state) => state.authState);
  const [showChatarea, setShowChatArea] = useState(false);
  const { id } = useParams();
  const splitId = id.split("+")[0].trim();
  const [socket, setSocket] = useState(null);
  const [recentMessage, setAllMessages] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setShowChatArea(showChat);
  }, [showChatarea, showChat]);

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
        ); // Dispatch new Message what i have sent
        setAllMessages(messages.payload); // Dispatch action to update messages in the state
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
  return (
    <>
      <div id="fixedbar">
        <AppSiderbar />
      </div>
      <div id="offcanvas">
        <OffCanvasNav />
      </div>
      <div className="main__chatbody">
        <Sidebar
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
        />

        <ChatOffcanvas />
        {showChatarea ? <ChatContent /> : ""}
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="chat_content" element={<ChatContent />} />
        </Routes>
      </div>
    </>
  );
}

export default ChatBody;
