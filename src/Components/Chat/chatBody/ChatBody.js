import React from "react";
import "./chatBody.css";
import Sidebar from "../SideBar/Sidebar";
import AppSiderbar from "../../../../src/Pages/Sidebar";
import OffCanvasNav from "../../../../src/Pages/OffCanvasNav";
import { Outlet } from "react-router-dom";
function ChatBody(props) {
  return (
    <>
      <div id="fixedbar">
        <AppSiderbar />
      </div>
      <div id="offcanvas">
        <OffCanvasNav />
      </div>
      <div className="main__chatbody">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
}

export default ChatBody;
