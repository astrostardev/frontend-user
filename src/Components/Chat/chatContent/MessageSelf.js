import React from "react";

function MessageSelf(props) {
  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chat__item ${props.user ? props.user : ""}`}
      id="self_msg"
    >
      <div className="chat__item__content">
        <p className="msg-title">hello</p>
        <p className="chat__time">12:00pm</p>
      </div>
    </div>
  );
}

export default MessageSelf;
