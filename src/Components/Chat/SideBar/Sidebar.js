import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineNightlight } from "react-icons/md";
import { IconButton } from "@mui/material";
import { IoMdSearch } from "react-icons/io";
import ConversationItem from "../ConversationItem/ConversationItem";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:8001";
var socket;
function Sidebar() {
  const { user,token } = useSelector((state) => state.authState);
  const [astrologer, setAstrologer] = useState(null);
  const[search,setSearch]= useState("")
  const {id} = useParams()

  const splitId = id.split("+")[0].trim();
  const [allMessages, setAllMessages] = useState(null);
  const [sendmsg, setSendMsg] = useState(null);
  const [allMessagesCopy, setAllMessagesCopy] = useState(null);
  const [message, setMessageContent] = useState("");
  const [loaded, setLoaded] = useState(false);
  const[latestMsg,setLatestMsg]=useState(null)

  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);
 //using socket io
 useEffect(() => {
  socket = io(ENDPOINT);
  socket.emit("setup", user);
  socket.on("connection", () => {
    setSocketConnectionStatus(!socketConnectionStatus);
  });
}, []);
  //get existing message
  useEffect(() => {
    const getAllMsg = async () => {
      try {
        let response = await fetch(
          `${process.env.REACT_APP_URL}/api/v1/latest_user_messages/${splitId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        socket.emit("join chat", splitId);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let data = await response.json();

      
      setLatestMsg(data); // Update latestMsg state variable

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getAllMsg();
  }, [token,latestMsg,splitId]);

  useEffect(() => {
    fetchData();
  }, []);

  // displaying all astrologers
  async function fetchData() {
    let response = await fetch(
      `${process.env.REACT_APP_URL}/api/v1/astrologer/getAstrologer/${id}`,
      {
        method: "GET",
      }
    );
    // console.log(response);
    let data = await response.json();
    console.log(data);

    setAstrologer(data);
    console.log("astroloer", astrologer);
  }

  return (
    <div className="sidebar_container">
      <div className="sd-header">
        <div>
          {user ? (
            <IconButton
              className="con-icon"
              style={{ marginTop: "3px", background: "#229e48",color:"#fff"}}
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
          {/* <IconButton>
            <MdOutlinePersonAddAlt />
          </IconButton>
          <IconButton>
            <IoMdAddCircleOutline />
          </IconButton>
          <IconButton>
            <MdOutlineNightlight />
          </IconButton> */}
        </div>
      </div>

      {/* <div className="sd-search">
        <IconButton>
          <IoMdSearch/>
        </IconButton>
        <input type="text"   onChange={(e)=>setSearch(e.target.value)} placeholder="search" className="search-box" />
      </div> */}
      <div className="sd-coversation">
            <ConversationItem astrologer={astrologer?.astrologer} message={latestMsg}  key={astrologer?.astrologer[0]?.firstname} />
      
      </div>
    </div>
  );
}

export default Sidebar;
