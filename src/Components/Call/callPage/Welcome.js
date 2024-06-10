import React,{useState,useEffect,useCallback} from "react";
import { useSelector, dispatch, useDispatch } from "react-redux";
import "./Call_welcome.css";
import { AnimatePresence } from "framer-motion";
// import logo from "../../../assests/chat.png";
import { motion } from "framer-motion";
import callIcon from "../../../assests/call.png"
import { isAstrologerBusy } from "../../../action/astrologerAction";
import { useNavigate, useParams } from "react-router-dom";
import Timer from "../../Chat/Timer";

function Welcome({setTime, timeStopped,isTimer, astrologer}) {
  const { isRunning } = useSelector((state) => state.timerState);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch()
  const splitId = id.split("+")[0].trim();

  const handleStopTimer = (stopTimerValue) => {
    timeStopped(stopTimerValue);
  };
  useEffect(() => {

    if (isTimer && isRunning) {
      alert("Call Time Ended Please Recharge", navigate(`/home`));
      dispatch(isAstrologerBusy(!isTimer, splitId));
    }
  }, [isTimer, dispatch, navigate, splitId, isRunning]);

  const handleTimer = useCallback(() => {
    const stopTimerValue = false; // Example value
    timeStopped(stopTimerValue);
  }, [timeStopped]);

  return (
    <div >
      
  <AnimatePresence>
   <motion.div 
   initial ={{opacity:0, scale:1}}
   animate={{opacity:1, scale:1}}
   exit = {{opacity:0, scale:0}} 
   transition={{ease:"anticipate",
   duration:"0.3"}}
   className="call_welcome-container">
    <div className="timer_container">
          <div className="current-chatting-user" id="user_container">
            <p className="con-icon"  id="call_user">{astrologer?.astrologer?.displayname[0]}</p>
            <div className="header-text">
              <p className="con-title"> {astrologer?.astrologer?.displayname}</p>

              <p className="con-timeStamp">online</p>
            </div>
            <div className="call_timer" style={{fontSize:"13px"}}>
            <Timer setTime={setTime} onStopTimer={handleStopTimer} />

            </div>

            </div>
    </div>
    <img src={callIcon} alt="" className="welcome-call_logo" />
      {/* <p className="text_welcome">View and text directly to astrologers present in the chat rooms</p> */}
  

       </motion.div>
    </AnimatePresence>
    </div>

  // <div  className="welcome-container">
  // <img src={logo} alt="" className="welcome-logo" />
  //   <p>View and text directly to astrologers present in the chat rooms</p>

  // </div>
  
  );
}

export default Welcome;
