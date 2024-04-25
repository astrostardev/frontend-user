import React,{useEffect,useRef,useContext} from "react";
import { extractTime } from "../../../utils/extractTime";
import { AudioContext } from "../../../context/AudioContext";

import './chatContent.css'
function MessageOthers({ props, astrologer,audio }) {
  const formatedTime = extractTime(props?.createdAt);
  const audioRef = useRef(null);
  const { setPlayingAudio } = useContext(AudioContext);

  useEffect(() => {
    const handlePlay = () => {
      setPlayingAudio(audioRef.current);
    };
  

    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.addEventListener('play', handlePlay);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener('play', handlePlay);
      }
    };
  }, [setPlayingAudio]);
  return (
    <>
    {props?.message ? (
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
    ):(
      <div
          style={{ animationDelay: `0.8s` }}
          className={`chat__item ${props.user ? props.user : ""}`}
          id="others_msg"
        >
     <p className="con-icon" id="other_user">
         {astrologer?.astrologer?.displayname[0]}
       </p>
          
            <audio controls className="msg-title" ref={audioRef}>
              <source src={audio} type="audio/wav" />
            </audio>
            <p className="chat__audio_time_other">{formatedTime}</p>
          
        </div>
    )}
    </>
   
  );
}

export default MessageOthers;
