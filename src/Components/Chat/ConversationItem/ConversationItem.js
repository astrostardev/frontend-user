import React from "react";
import "./conversationitem.css";
import { extractDayAndDate, extractTime } from "../../../utils/extractTime";
import { FaMicrophone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
function ConversationItem({ astrologer, message, time, audio }) {
  const navigate = useNavigate();
  const formatedDay = extractDayAndDate(time);
  const formatedTime = extractTime(time);
  console.log(audio);
  return (
    <motion.div
      onClick={() => {
        navigate(`chat_content`);
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="conversation-container">
        <p className="con-icon">{astrologer?.displayname[0]}</p>
        <p className="con-title">{astrologer?.displayname}</p>
        {audio ? (
          <p className="con-lastMessage">
            {" "}
            <FaMicrophone /> Audio
          </p>
        ) :  (
          <p className="con-lastMessage">{message}</p>
        )
       
      }
        <p className="con-timeStamp">
          {formatedTime} <span>{formatedDay}</span>
        </p>
      </div>
    </motion.div>
  );
}

export default ConversationItem;
