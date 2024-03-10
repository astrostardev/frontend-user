import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineNightlight } from "react-icons/md";
import { IconButton } from "@mui/material";
import { IoMdSearch } from "react-icons/io";
import OffCanvasConversationItem from './OffCanvasConversationItem'
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import './offCanvas.css'
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const ENDPOINT = "ws://localhost:8001";

function ChatOffcanvas({showChat}) {
  const { user, token } = useSelector((state) => state.authState);
  const [astrologer, setAstrologer] = useState(null);
  const [search, setSearch] = useState("");
  const { id } = useParams();
  const splitId = id.split("+")[0].trim();
  const [allMessages, setAllMessages] = useState("");
  const [latestMsg, setLatestMsg] = useState(null);
  const [socket, setSocket] = useState(null);
  const[showSidebar,setShowsidebar] = useState(false)
const navigate = useNavigate()
  //initailising socket
  useEffect(() => {
    const newSocket = new WebSocket(ENDPOINT);

    newSocket.onopen = () => {
      console.log("Connected to WebSocket server");

      const setupMessage = {
        type: "setup",
        userId: user?._id,
      };
      newSocket.send(JSON.stringify(setupMessage));
    };

    newSocket.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [user?._id]);
  //getting latest msg
  useEffect(() => {
    if (socket) {
      socket.addEventListener("open", () => {
        console.log("WebSocket connection is open.");
        console.log("paramsId", splitId);
        socket.send(
          JSON.stringify({
            type: "latest msg",
            room: splitId,
            userId: user?._id,
          })
        );
      });

      socket.addEventListener("message", (event) => {
        const messageData = JSON.parse(event.data);
        if (messageData.type === "latest msg") {
          setLatestMsg(messageData.messages?.message);
        }
      });
      //  const  latestMessage = allMessages.length-1

      socket.addEventListener("close", () => {
        console.log("WebSocket connection is closed.");
      });
    } else {
      console.error("WebSocket connection is not open.");
    }
  }, [socket, splitId, allMessages, latestMsg, user?._id]);

  //show astrologer on side bar
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
    <>  <div>
      <div  onClick={()=>setShowsidebar(!showSidebar)} >
     {showSidebar ? <FaAngleRight className="left_angle"/> : <FaAngleLeft className="left_angle"/> } 

      </div>
{
  showSidebar ?
  <>

    <div  id="offCanvas_chat overlay">
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
      // message={latestMsg}
      key={astrologer?.astrologer[0]?.firstname}
   showChat={showChat}
    />
  </div>
</div>

  </>

: ""
}
      </div>  

  
    </>

  );
}

export default ChatOffcanvas;
