import React from 'react'
import './conversationitem.css'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
function ConversationItem({props}) {
  const navigate = useNavigate()

  return (
    <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.98}}>
    <div className='conversation-container'  onClick={()=>{navigate('chat_content')}}>
    <p className='con-icon'>{props.name[0]}</p>
      <p className='con-title'>{props.name}</p>
      <p className='con-lastMessage'>{props.lastMessage}</p>
      <p className='con-timeStamp'>{props.timeStamp}</p>
    </div>
     


    </motion.div>
  )
}

export default ConversationItem
