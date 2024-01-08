import React from "react";
import astro1 from "../../../assests/astro1.svg";
import astro2 from "../../../assests/astro2.svg";
import astro3 from "../../../assests/astro3.svg";
import arr_forward from "../../../assests/arrow_forward.svg";
import arrow_ios from "../../../assests/arrow_forward_ios.svg";
import plus from "../../../assests/plus.svg";
import star from "../../../assests/Star 1.svg";
import search from "../../../assests/search.svg";
import group from "../../../assests/Group.svg";
import line from "../../../assests/horizontalLine.svg";
import OffCanvasNav from "../../OffCanvasNav";
import { Link } from "react-router-dom";
import Sidebar from "../../Sidebar";
import "../homeStyleSheets/Chat.css";
import MetaData from "../../../Pages/MetaData";
function Chat(props) {
  const astrologerData = [
    {
      image: astro1,
      name: "ramamoorthi",
      rate: 4.2,
      exp: "15",
      chat: "4",
      call: "21",
    },

    {
      image: astro2,
      name: "ganesh",
      rate: 4.0,
      exp: "3",
      chat: "24",
      call: "240",
    },
    {
      image: astro3,
      name: "Gurusami",
      rate: 3.9,
      exp: "9",
      chat: "25",
      call: "20",
    },
    {
      image: astro1,
      name: "prabu",
      rate: 4.5,
      exp: "19",
      chat: "27",
      call: "40",
    },
    {
      image: astro2,
      name: "priya shankar",
      rate: 3.8,
      exp: "23",
      chat: "20",
      call: "90",
    },
    {
      image: astro3,
      name: "bavanikumari",
      rate: 4.2,
      exp: "4",
      chat: "5",
      call: "290",
    },
  ];

  return (
    <div>
      <MetaData title={'Astro5Star-chat'} />

      <div id="fixedbar">
        <Sidebar />
      </div>
      <div id="offcanvas">
        <OffCanvasNav />
      </div>
      <main className="infoContainer">
        <h4 style={{ margin: "30px", marginLeft: "20px" }}>Chat</h4>
        <div
          style={{
            height: "3px",
            width: "30px",
            backgroundColor: "#229e48",
            borderRadius: "10px",
            marginTop: "3px",
            marginLeft: "20px",
          }}
        ></div>

        <div className="container-fluid" >
          <div className=" top_astrologers chat_astrologer" id="mobile_view">
            <div className="meet_header">
              <h4 className="top_astro">Available Astrologers</h4>
            </div>
            <div>
              <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-2 astrologer_container">
                {astrologerData.map((data) => (
                  <div class="col">
                    <div className="card" key={data.id}>
                      {" "}
                      {/* Added a unique key */}
                      <div>
                        <div className="astro_detail">
                          <div className="astro_img">
                            <img src={data.image} alt="" />
                          </div>
                          <div className="about_astrologer">
                            <h4>{data.name}</h4>
                            <div>
                              <button className="add">
                                <img src={plus} alt="" />
                              </button>
                              <button className="rating">
                                <img src={star} alt="" /> {data.rate}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="about_astro">
                          <span>Vedic, Nadi</span>
                          <span>Tamil, Eng</span>
                          <span>Exp:{data.exp} years</span>
                        </div>
                        <div
                          className="charge_btns"
                          style={{
                            justifyContent: "flex-start",
                            marginLeft: "10px",
                          }}
                        >
                          <Link
                            className=""
                            to="/chat"
                            style={{ color: "black" }}
                          >
                            <button>
                              chat <span>&#8377;</span>
                              {data.chat}/min
                            </button>
                          </Link>
                          {/* <Link className='' to='/call' style={{color:"black"}}><button>
                            call <span>&#8377;</span>
                            {data.call}/min
                          </button></Link> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Chat;
