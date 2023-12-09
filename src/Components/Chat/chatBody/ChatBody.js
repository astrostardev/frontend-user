import React from "react";
import Nav from "../navBar/Nav";
import ChatContent from "../chatContent/ChatContent";
import AstroProfile from "../profile/AstrologerProfile";
import './chatBody.css'
function ChatBody(props) {
  return (

    <div className="main__chatbody">
      <ChatContent />
      <AstroProfile />
    </div>

  );
}

export default ChatBody;
