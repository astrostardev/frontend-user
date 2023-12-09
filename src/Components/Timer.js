import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, userCall } from '../action/userAction';

const Timer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const { user = [] } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const id = user._id;
  const timerRef = useRef();
  const[recordedTime,setRecordedTime]=useState('')

useEffect(()=>{
  dispatch(login)
},[dispatch])
  const startTimer = () => {
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 59) {
          setMinutes((prevMinutes) => {
            if (prevMinutes === 59) {
              setHours((prevHours) => prevHours + 1);
              return 0;
            }
            return prevMinutes + 1;
          });
          return 0;
        }
        return prevSeconds + 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    recordTime();
  };

  const recordTime = () => {
    setRecordedTime(()=>
      ` ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} seconds`
    );

  };
useEffect(()=>{
// console.log('time',id, recordedTime);
dispatch(userCall(id, recordedTime));
},[recordedTime,id,dispatch])


  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setRecordedTime('');
  };

  return (
    <div>
      <div style={{ margin: '25px' }}>
        <h2>Call Duration</h2>
        <p>
          Time - {hours < 10 ? '0' + hours : hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds} seconds
        </p>
      </div>
      <div>
        <button
          onClick={isRunning ? stopTimer : startTimer}
          style={{ fontSize: '25px', margin: '10px', border: 'none', background: '#FFCB11', color: '#fff', padding: ' 0 10px' }}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        {/* <button onClick={resetTimer} style={{ fontSize: '25px', margin: '10px', border: 'none', background: '#FFCB11', color: '#fff', padding: ' 0 10px' }}>
          Reset
        </button> */}
      </div>
      <div id="record">{recordedTime}</div>
    </div>
  );
};

export default Timer;
