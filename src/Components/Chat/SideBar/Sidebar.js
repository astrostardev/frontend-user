import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { FaUserCircle } from "react-icons/fa";
import { IconButton } from "@mui/material";
import ConversationItem from "../ConversationItem/ConversationItem";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Sidebar({ latestMsg, time }) {
  const messagesArray = useSelector((state) => state?.conversationState?.messages?.message);
  const { user } = useSelector((state) => state.authState);
  const [astrologer, setAstrologer] = useState(null);
  const { id } = useParams();
  const recentMsg = messagesArray ? messagesArray : latestMsg;

  // Show astrologer on side bar
  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/astrologer/getAstrologer/${id}`,
        {
          method: "GET",
        }
      );
      let data = await response.json();
      setAstrologer(data);
    }
    fetchData();
  }, []);

  return (
    <div className="sidebar_container">
      <div className="sd-header">
        <div>
          {user ? (
            <IconButton
              className="con-icon"
              style={{ marginTop: "3px", background: "#229e48", color: "#fff" }}
            >
              {user?.name[0]}
            </IconButton>
          ) : (
            <IconButton>
              <FaUserCircle />
            </IconButton>
          )}
        </div>
        <div>
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
