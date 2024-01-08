import "../Stylesheets/offcanvas.css";
import { HiMenuAlt1 } from "react-icons/hi";
import { PiWalletBold } from "react-icons/pi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import Logo from "../assests/logo green.png";
import astrologer from "../assests/astro1.svg";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsCash, BsChatLeftText } from "react-icons/bs";
import { RiHistoryFill } from "react-icons/ri";
import { MdAddToQueue, MdArrowDropDown, MdOutlineCall } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { FiHelpCircle } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import facebook from "../assests/Facebook.svg";
import twitter from "../assests/Twitter.svg";
import insta from "../assests/Instagram.svg";
import youtube from "../assests/YouTube.svg";
import whatsapp from "../assests/WhatsApp.svg";
import { RiHomeLine } from "react-icons/ri";

function Offcanvas() {
  function openCanvas() {
    let canvas = document.querySelector(".canvas");
    canvas.classList.add("openCanvas");
  }
  function closeCanvas() {
    let canvas = document.querySelector(".canvas");
    canvas.classList.remove("openCanvas");
  }

  function toggledropdown() {
    let content = document.querySelector(".drop");
    content.classList.toggle("show-content");
  }

  function closedropdown() {
    let content = document.querySelector(".drop");
    content.classList.remove("show-content");
  }
  function toggleHis() {
    let historydrop = document.querySelector(".history-container");
    historydrop.classList.toggle("open-hist");
  }

  // const refCanvas = useRef(null)

  // const handleClickOutside = (e) => {
  //     if (!refCanvas.current.contains(e.target)) {
  //         closeCanvas()
  //     }
  // }
  // useEffect(() => {
  //     document.addEventListener("click", handleClickOutside, true)
  // }, [])

  // const dropOne = useRef(null)
  // const handleDropOne = (e) => {
  //     if (!dropOne.current.contains(e.target)) {
  //         closedropdown()
  //     }
  // }
  // useEffect(() => {
  //     document.addEventListener("click", handleDropOne, true)
  // }, [])

  return (
    <>
      <aside className="canvas">
        <div className="logoContainer">
          <img src={Logo} alt="logo" />
          <div>
            <RiCloseLine style={{ fontSize: "25px",color:"#229e48" }} onClick={closeCanvas} />
          </div>
        </div>
        <div className="divider"></div>
        <section className="side-menu">
          <Link
            className="side-link"
            to="/home"
            onClick={closeCanvas}
          >
            <RiHomeLine style={{ fontSize: "20px" }} />
            <span>Home</span>
          </Link>
          <Link
            className="side-link"
            to="/wallet"
            onClick={closeCanvas}
          >
           
            <PiWalletBold style={{ fontSize: "20px" }} />
            <span>Wallet</span>
          </Link>
          <Link className="side-link" to="/chat" onClick={closeCanvas}>
            <BsChatLeftText style={{ fontSize: "20px" }} />
            <span>Chat</span>
          </Link>
          <Link className="side-link" to="/call" onClick={closeCanvas}>
            <MdOutlineCall style={{ fontSize: "20px" }} />
            <span>Call</span>
          </Link>
          <button className="side-link" onClick={toggleHis}>
            <RiHistoryFill style={{ fontSize: "20px" }} />
            History
            <MdArrowDropDown style={{ fontSize: "20px", marginLeft: "40px" }} />
          </button>
          <div className="history-container">
            <Link className="hist-link" to="/chat_history" onClick={closeCanvas}>
              <BsChatLeftText style={{ fontSize: "20px" }} />
              <span>Chat</span>
            </Link>
            <Link className="hist-link" to="/call_history" onClick={closeCanvas}>
              <MdOutlineCall style={{ fontSize: "20px" }} />
              <span>Call</span>
            </Link>
          </div>

          <Link className="side-link" to="/settings" onClick={closeCanvas}>
            <AiOutlineSetting style={{ fontSize: "20px" }} />
            <span>Settings</span>
          </Link>
          <Link className="side-link" onClick={closeCanvas}>
            <FiHelpCircle style={{ fontSize: "20px" }} />
            <span>Help</span>
          </Link>
        </section>
        <div className="divider"></div>
        <div className="astro_social_icon">
          <div className="media_icons">
            <img src={facebook} alt="" />
            <img src={twitter} alt="" />
            <img src={insta} alt="" />
            <img src={youtube} alt="" />
            <img src={whatsapp} alt="" />
          </div>
          <p>@ 2023 All Rights Received</p>
        </div>
      </aside>
      <main id="navhead">
        <section className="_nav">
          <div>
            {/* logo */}
            <div style={{ marginTop: "5px" }}>
              <HiMenuAlt1 style={{ fontSize: "25px" }} onClick={openCanvas} />
            </div>
            <img src={Logo} alt="logo" />
          </div>

          <div onClick={closeCanvas}>
            {/* Earning */}
          
            <IoMdNotificationsOutline style={{ fontSize: "25px" }} />

            {/* Profile */}
            <div className="profileDrop">
              <button className="dropbtn" onClick={toggledropdown}>
                <img src={astrologer} alt="astrologer" className="astrologer" />
                <div style={{ marginTop: "5px" }}>
                  <RiArrowDropDownLine style={{ fontSize: "25px" }} />
                </div>
              </button>
              <div className="drop">
                <Link to="/profile" onClick={closedropdown}>
                  Your Profile
                </Link>
                <hr />
                <Link href="#" onClick={closedropdown}>
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Offcanvas;
