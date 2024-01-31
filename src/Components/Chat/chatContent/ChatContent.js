import React, { Component, useState, createRef, useEffect } from "react";
import ChatItem from "./ChatItem";
import "./chatContent.css";
import { IconButton } from "@mui/material";
import { IoAddOutline } from "react-icons/io5";
function ChatContent(props) {
  const messagesEndRef = createRef(null);
  const [msg, setMsg] = useState("");
  const [chatItms, setChatItms] = useState([]);
  const [conversation,setConversation] = useState([
    {
      name:"Test #1",
      lastMessage:"Last Message #1",
      timeStamp:"today"
    },
    
  ]);
  const chatItems = [
    {
      key: 1,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "Hi Tim, How are you?",
    },
    {
      key: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "I am fine.",
    },
    {
      key: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "What about you?",
    },
    {
      key: 4,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "Awesome these days.",
    },
    {
      key: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "Finally. What's the plan?",
    },
    {
      key: 6,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "what plan mate?",
    },
    {
      key: 7,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "I'm taliking about the tutorial",
    },
  ];
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.keyCode === 13) {
        if (msg !== "") {
          const newChatItem = {
            key: 1,
            type: "",
            msg: msg,
            image:
              "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
          };
          setChatItms([...chatItms, newChatItem]);
          scrollToBottom();
          setMsg("");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [chatItms, msg]);

  const onStateChange = (e) => {
    setMsg(e.target.value);
  };
  return (
    <div className="main__chatcontent">
      <div className="content__header">
        <div className="blocks">
          <div className="current-chatting-user">
            <p className="con-icon">T</p>
            <div className="header-text">
              <p className="con-title">Test#1</p>
              <p className="con-timeStamp">online</p>
            </div>
            <IconButton>End</IconButton>
          </div>
        </div>

        {/* <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button>
            </div>
          </div> */}
      </div>
      <div className="content__body">
        <div className="chat__items">
          {chatItems.map((itm, index) => {
            return (
              <ChatItem
                animationDelay={index + 2}
                key={itm.key}
                user={itm.type ? itm.type : "me"}
                msg={itm.msg}
                image={itm.image}
              />
            );
          })}
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
            onChange={onStateChange}
            value={msg}
          />
          <button className="btnSendMsg" id="sendMsgBtn">
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatContent;
