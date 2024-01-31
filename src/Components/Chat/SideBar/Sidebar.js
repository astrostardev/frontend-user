import React,{useState} from "react";
import "./sidebar.css";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineNightlight } from "react-icons/md";
import { IconButton } from "@mui/material";
import { IoMdSearch } from "react-icons/io";
import ConversationItem from "../ConversationItem/ConversationItem";
function Sidebar() {
  const [conversation,setConversation] = useState([
    {
      name:"Test #1",
      lastMessage:"Last Message #1",
      timeStamp:"today"
    },
    {
      name:"Test #2",
      lastMessage:"Last Message #2",
      timeStamp:"today"
    },
    {
      name:"Test #3",
      lastMessage:"Last Message #3",
      timeStamp:"today"
    }
  ]);

  return (
    <div className="sidebar_container">
      <div className="sd-header">
        <div>
          <IconButton>
            <FaUserCircle />
          </IconButton>
        </div>
        <div>
          <IconButton>
            <MdOutlinePersonAddAlt />
          </IconButton>
          <IconButton>
            <IoMdAddCircleOutline />
          </IconButton>
          <IconButton>
            <MdOutlineNightlight />
          </IconButton>
        </div>
      </div>

      <div className="sd-search">
        <IconButton>
        <IoMdSearch /> 
        </IconButton>
        <input type="text" placeholder="search" className="search-box" />
      </div>
      <div className="sd-coversation">
        {conversation.map((conversation)=>{
        return <ConversationItem props={conversation} key={conversation.name}/>
       
        })}
      </div>
    </div>
  );
}

export default Sidebar;
