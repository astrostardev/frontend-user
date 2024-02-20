import React from "react";

function MessageOthers(props) {
  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chat__item ${props.user ? props.user : ""}`}
      id="others_msg"
    >
      <p className="con-icon" id="other_user">
        H
      </p>

      <div className="chat__item__content other">
        <p className="msg-title">Hello gaythri</p>
        <p className="chat__time">12:00pm</p>
      </div>
    </div>
  );
}

export default MessageOthers;
