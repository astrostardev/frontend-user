import React, { useState, useRef, useEffect, useCallback } from "react";
import { setIsRunning } from "../../slice/timerSlice";
import { useDispatch } from "react-redux";

const Timer = ({ setTime, onStopTimer }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const timerRef = useRef();
  const [isTimerStopped, setIsTimerStopped] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (setTime) {
      startTimer();
    }
  }, [setTime]);

  const startTimer = () => {
    const startTime = Date.now(); // Record the start time

    timerRef.current = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Calculate elapsed time in seconds

      const newHours = Math.floor(elapsedTime / 3600);
      const newMinutes = Math.floor((elapsedTime % 3600) / 60);
      const newSeconds = elapsedTime % 60;

      setHours(newHours);
      setMinutes(newMinutes);
      setSeconds(newSeconds);
    }, 1000);
  };

  useEffect(() => {
    if (minutes >= setTime && minutes === setTime) {
      clearInterval(timerRef.current);
      console.log("Timer stopped at minutes:", minutes);
      setIsTimerStopped(true);
      dispatch(setIsRunning(true)); // Dispatching setIsRunning to update the state in Redux store
    }  
  }, [minutes, setTime, dispatch]);

  useEffect(() => {
    if (isTimerStopped) {
      onStopTimer(true);
    }
  }, [isTimerStopped]);

  const handleTimer = useCallback(() => {
    const stopTimerValue = isTimerStopped;
    // You can use stopTimerValue as needed
  }, [isTimerStopped]);

  return (
    <div>
      <p>
        {minutes < 10 ? "0" + minutes : minutes} :{" "}
        {seconds < 10 ? "0" + seconds : seconds}{" "}
        {minutes < 1 ? "sec" : minutes === 1 ? "min" : "mins"}
      </p>
    </div>
  );
};

export default Timer;
