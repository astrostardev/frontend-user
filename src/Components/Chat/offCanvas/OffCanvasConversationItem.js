import React from 'react'
import './conversationitem.css'
import { extractTime } from "../../../utils/extractTime";

import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
function ConversationItem({astrologer,message,time}) {
  const navigate = useNavigate()
  const formatedTime = extractTime(time);

  return (
    <motion.div onClick={()=>{navigate(`chat_content`)}} whileHover={{scale:1.05}} whileTap={{scale:0.98}}>
    <div className='conversation-container'>
      <p className='con-icon'>{astrologer?.displayname[0]}</p>
      <p className='con-title'>{astrologer?.displayname}</p>
      <p className='con-lastMessage'>{message}</p>
      <p className='con-timeStamp'>{formatedTime}</p>
    </div>
    </motion.div>
  )
}

export default ConversationItem
