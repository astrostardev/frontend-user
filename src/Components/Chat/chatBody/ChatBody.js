import React from "react";
import Nav from "../navBar/Nav";
import ChatContent from "../chatContent/ChatContent";
import AstroProfile from "../profile/AstrologerProfile";
import './chatBody.css'
import Sidebar from "../SideBar/Sidebar";
function ChatBody(props) {
  return (

    <div className="main__chatbody">
      <Sidebar />
      <ChatContent />
      
    </div>

  );
}

export default ChatBody;
