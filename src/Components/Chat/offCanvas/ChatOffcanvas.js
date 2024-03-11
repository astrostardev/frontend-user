import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineNightlight } from "react-icons/md";
import { IconButton } from "@mui/material";
import { IoMdSearch } from "react-icons/io";
import OffCanvasConversationItem from "./OffCanvasConversationItem";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./offCanvas.css";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";


function ChatOffcanvas({latestMsg,time }) {
  const messagesArray = useSelector((state) => state?.conversationState?.messages?.message);
  const { user } = useSelector((state) => state.authState);
  const [astrologer, setAstrologer] = useState(null);
  const { id } = useParams();

  const recentMsg = messagesArray ? messagesArray : latestMsg;
  const [showSidebar, setShowsidebar] = useState(false);
  const handleItemClick = () => {
    setShowsidebar(!showSidebar);
  };

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
    <>
      {" "}
      <div>
        <div onClick={handleItemClick}>
          {showSidebar ? (
            <FaAngleRight className="left_angle" />
          ) : (
            <FaAngleLeft className="left_angle" />
          )}
        </div>
        {showSidebar ? (
          <>
            <div id="offCanvas_chat">
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
