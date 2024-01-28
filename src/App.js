import "./App.css";
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Login from "./Pages/Login";
import Register from './Pages/Register'
import UserProfile from "./Components/UserProfile";
import MeetAstrologers from "./Components/Home/homeComponents/Home";
import Chats from "./Components/Chat/Chats";
import Wallet from "./Components/Wallet";
import Chat from "./Components/Home/homeComponents/Chat";
import Call from "./Components/Home/homeComponents/Call";
import ChatHistory from "./Components/Home/homeComponents/ChatHistory";
import CallHistory from "./Components/Home/homeComponents/CallHistory";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Timer from "./Components/Timer";
import { HelmetProvider } from 'react-helmet-async'
import { useSelector } from "react-redux";


function App() {

  const { loading, error, isAuthenticated } = useSelector(state => state.authState)

  return (
    <div className="App">
      <HelmetProvider>
      <ToastContainer theme="dark"/>
      <Router>
        {/* <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes> */}
 
           <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/timer" element={<Timer />} />
            <Route path="/home" element={isAuthenticated ? <MeetAstrologers /> : <Login />} />
            <Route path="/profile" element={isAuthenticated ? <UserProfile /> : <Login />} />
            <Route path="/chat_page" element={isAuthenticated ? <Chats /> : <Login />} />
            <Route path="/chat_history" element={isAuthenticated ? <ChatHistory /> : <Login />} />
            <Route path="/call_history" element={isAuthenticated ? <CallHistory /> : <Login />} />
            <Route path="/wallet" element={isAuthenticated ? <Wallet />  : <Login />} />
            <Route path="/chat" element={isAuthenticated ?<Chat /> : <Login />} />
            <Route path="/call" element={isAuthenticated ?<Call />  : <Login />} />
            </Routes>
      

    
      </Router>
      </HelmetProvider>
    </div>
  );
}

export default App;
