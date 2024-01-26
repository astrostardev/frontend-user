import { useState } from "react";
import "./App.css";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Services from "./Components/Services";
import Home from "./Pages/Home";
import Layout from "./Layout";
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
function App() {


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
            <Route path="/home" element={<MeetAstrologers />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/chat_page" element={<Chats />} />
            <Route path="/chat_history" element={<ChatHistory />} />
            <Route path="/call_history" element={<CallHistory />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/call" element={<Call />} />
            </Routes>
      

    
      </Router>
      </HelmetProvider>
    </div>
  );
}

export default App;
