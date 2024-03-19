import React from "react";
import "./sidebar.css";
import { FaUserCircle } from "react-icons/fa";
import { IconButton } from "@mui/material";
import ConversationItem from "../ConversationItem/ConversationItem";
import { useSelector } from "react-redux";
function Sidebar({ latestMsg, time, astrologer}) {
  const messagesArray = useSelector((state) => state?.conversationState?.messages?.message);
  const { user } = useSelector((state) => state.authState);
  const recentMsg = messagesArray ? messagesArray : latestMsg;


  return (
    <div className="sidebar_container">
      <div className="sd-header">
        <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
        
          {user ? (
            <IconButton
              className="con-icon"
              style={{  background: "#229e48", color: "#fff" }}
            >
         {user && user.name ? user.name[0] : ''}
            </IconButton>
          ) : (
            <IconButton>
              <FaUserCircle />
            </IconButton>
          )}
        <h5 className="header">{user?.name}</h5>

        </div>

  
      
      </div>

      <div className="sd-coversation">
        <ConversationItem
          astrologer={astrologer?.astrologer}
          message={messagesArray ? messagesArray : recentMsg}
          time={time}
          key={astrologer?.astrologer[0]?.firstname}
        />
      </div>
    </div>
  );
}

export default Sidebar;
