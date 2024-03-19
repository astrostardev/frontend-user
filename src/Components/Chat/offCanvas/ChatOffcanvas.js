import React,{useState} from "react";
import { FaAngleRight, FaUserCircle } from "react-icons/fa";
import { IconButton } from "@mui/material";
import OffCanvasConversationItem from "./OffCanvasConversationItem";
import { useSelector } from "react-redux";
import "./offCanvas.css";
import { FaAngleLeft } from "react-icons/fa6";

function ChatOffcanvas({latestMsg,time,astrologer }) {
  const messagesArray = useSelector((state) => state?.conversationState?.messages?.message);
  const { user } = useSelector((state) => state.authState);
  const recentMsg = messagesArray ? messagesArray : latestMsg;
  const [showSidebar, setShowsidebar] = useState(true);
  


  const handleItemClick = () => {
    setShowsidebar(!showSidebar);
  };



  return (
    <>
      {" "}
      <div>
        <div onClick={handleItemClick}>
          {showSidebar ? (
            ''
          ) : (
            <FaAngleLeft className="left_angle" />
          )}
        </div>
        {showSidebar ? (
          <>
            <div id="offCanvas_chat">
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
        <OffCanvasConversationItem
          astrologer={astrologer?.astrologer}
          message={messagesArray ? messagesArray : recentMsg}
          time={time}
          key={astrologer?.astrologer[0]?.firstname}
          onClick={handleItemClick}
        />
      </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default ChatOffcanvas;
