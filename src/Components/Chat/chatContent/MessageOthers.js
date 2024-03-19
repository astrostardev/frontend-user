import React from "react";
import { extractTime } from "../../../utils/extractTime";

function MessageOthers({ props, astrologer }) {
  const formatedTime = extractTime(props?.createdAt);

  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={`chat__item ${props?.user ? props?.user : ""}`}
      id="others_msg"
    >
      <p className="con-icon" id="other_user">
        {astrologer?.astrologer?.displayname[0]}
      </p>
      <div className="chat__item__content other">
        <p className="msg-title">{props?.message}</p>
        <p className="chat__time">{formatedTime}</p>
      </div>
    </div>
  );
}

export default MessageOthers;
