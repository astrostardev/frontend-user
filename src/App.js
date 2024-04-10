import "./App.css";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UserProfile from "./Components/Profiles/UserProfile";
import AstrologerProfile from "./Components/Profiles/AstrologerProfile";
import MeetAstrologers from "./Components/Home/homeComponents/Home";
import Wallet from "../src/Components/Home/homeComponents/Wallet";
import Chat from "./Components/Home/homeComponents/Chat";
import Call from "./Components/Home/homeComponents/Call";
import ChatHistory from "./Components/Home/homeComponents/ChatHistory";
import CallHistory from "./Components/Home/homeComponents/CallHistory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Timer from "./Components/Chat/Timer";
import { HelmetProvider } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import ChatContent from "./Components/Chat/chatContent/ChatContent";
import ChatBody from "./Components/Chat/chatBody/ChatBody";
import Welcome from "./Components/Chat/chatPages/Welcome";
import { useEffect, useState, useCallback } from "react";
import { setIsRunning } from "./slice/timerSlice";
import FullChatHistory from "./Components/Home/homeComponents/FullChatHistory";

function App() {
  const [showTime, setShowTime] = useState();
  const [timeStopped, setTimeStopped] = useState(false);
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(
    (state) => state.authState
  );

//  const navigate = useNavigate()
  const handleStopTimer = (stopTimerValue) => {
    setTimeStopped(stopTimerValue);
  };

  const handleTimer = useCallback(() => {
    const stopTimerValue = false; // Example value
    handleStopTimer(stopTimerValue); // Send value back to App.js
  }, []);



  return (
    <div className="App">
      <HelmetProvider>
        <ToastContainer theme="dark" />
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/timer" element={<Timer />} />
            <Route
              path="/home"
              element={
                isAuthenticated ? <MeetAstrologers isTimer={timeStopped}/> : <Navigate to="/" />
              }
            />
            <Route
              path="/profile"
              element={
                isAuthenticated ? <UserProfile /> : <Navigate to="/" />
              }
            />
            <Route
              path="/astrologer_profile/:id"
              element={
                isAuthenticated ? <AstrologerProfile /> : <Navigate to="/" />
              }
            />
            <Route
              path="chats/:id"
              element={
                isAuthenticated ? (
                  <ChatBody onStopTimer={handleStopTimer} isTimer={timeStopped}/>
                ) : (
                  <Navigate to="/" />
                )
              }
            >
              <Route
                path="chat_content"
                element={isAuthenticated ? <ChatContent /> : <Navigate to="/" />}
              />
              <Route
                path="welcome"
                element={isAuthenticated ? <Welcome /> : <Navigate to="/" />}
              />
            </Route>
            <Route
              path="/off_chat_content/:id"
              element={isAuthenticated ? <ChatContent /> : <Navigate to="/" />}
            />
            <Route
              path="/chat_history"
              element={isAuthenticated ? <ChatHistory /> : <Navigate to="/" />}
            />
              <Route
              path="/full_chat_history/:id"
              element={isAuthenticated ? <FullChatHistory /> : <Navigate to="/" />}
            />

            <Route
              path="/call_history"
              element={isAuthenticated ? <CallHistory /> : <Navigate to="/" />}
            />
            <Route
              path="/wallet"
              element={isAuthenticated ? <Wallet /> : <Navigate to="/" />}
            />
            <Route
              path="/chat"
              element={isAuthenticated ? <Chat /> : <Navigate to="/" />}
            />
            <Route
              path="/call"
              element={isAuthenticated ? <Call /> : <Navigate to="/" />}
            />
          </Routes>
        </Router>
      </HelmetProvider>
    </div>
  );
}

export default App;
