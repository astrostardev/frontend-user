import React, { useEffect, useState } from "react";
import "../homeStyleSheets/Home.css";
import arr_forward from "../../../assests/arrow_forward.svg";
import arrow_ios from "../../../assests/arrow_forward_ios.svg";
import plus from "../../../assests/plus.svg";
import star from "../../../assests/Star 1.svg";
import astro1 from "../../../assests/astro1.svg";
import astro2 from "../../../assests/astro2.svg";
import astro3 from "../../../assests/astro3.svg";
import search from "../../../assests/search.svg";
import group from "../../../assests/Group.svg";
import astroImage from "../../../assests/astrologerImage.png";

import line from "../../../assests/horizontalLine.svg";
import postalCodes from "postal-codes-js";
import { MdArrowDropDown } from "react-icons/md";
import OffCanvasNav from "../../OffCanvasNav";
import { Link } from "react-router-dom";
import Sidebar from "../../Sidebar";

function MeetAstrologers(props) {
const[astrologers, setAstrologers]=useState()
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
useEffect(()=>{
  async function fetchData() {
    let response = await fetch("https://shy-gold-sawfish-robe.cyclic.app/api/v1/astrologer/allAstrologers", {
        method: "GET",
    });
    // console.log(response);
    let data = await response.json();
    console.log(data)
   
    setAstrologers(data.astrologers)
    console.log(astrologers);
}
fetchData();
},[])
  return (
    <div>
      <div id="fixedbar">
        <Sidebar />
      </div>
      <div id="offcanvas">
        <OffCanvasNav />
      </div>
      <main className="infoContainer">
        <div className="search_space">
          <div className="search_div">
            <img src={search} alt="" />
            <input type="text" placeholder="search" />
          </div>

          <div className="filter_btn">
            <button>
              {" "}
              <img src={line} alt="" />
              Filter
            </button>
            <button>
              {" "}
              <img src={group} alt="" /> Sort
            </button>
          </div>
        </div>
        <div className="container-fluid ">
          <div className="meet_astro_option">
            <div>
              <h4> Meet Astrologers</h4> 
            </div>
         
            <div className="astro_drop_btn button_container">
              <button className="all">
                All <img src={arrow_ios} alt="" />
              </button>
              <button>
                top astrologers
                <img src={arr_forward} alt="" />
              </button>
              <button>
                language <img src={arr_forward} alt="" />
              </button>
            
              <button>
                top astrologers <img src={arr_forward} alt="" />
              </button>
              <button>
                top astrologers
                <img src={arr_forward} alt="" />
              </button>
            </div>
          
          </div>
          <div className=" top_astrologers">
            <div className="meet_header">
              <h4 className="top_astro">Top Astrologers</h4>
            </div>
            <div>
              <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-3 astrologer_container">
                {astrologers?.map((data) => (
                  <div class="col" style={{width:"330px"}}>
                    <div className="card" key={data.id}>
                      {" "}
                      {/* Added a unique key */}
                      <div>
                        <div className="astro_detail">
                          <div className="astro_img">
                            <img src={astroImage} alt="" />
                          </div>
                          <div className="about_astrologer">
                            <h4>{data.firstname}</h4>
                            <div>
                              <button className="add">
                                <img src={plus} alt="" />
                              </button>
                              <button className="rating">
                                <img src={star} alt="" /> 4.2
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="about_astro">
                          <span>Vedic, Nadi</span>
                          <span>Tamil, Eng</span>
                          <span>Exp:{data.experience} years</span>
                        </div>
                        <div className="charge_btns">
                          <Link
                            className=""
                            to="/chat_page"
                            style={{ color: "black" }}
                          >
                            <button>
                              chat <span>&#8377;</span>
                             {data.chat}/min
                            </button>
                          </Link>
                          <Link
                            className=""
                            to="/call"
                            style={{ color: "black" }}
                          >
                            <button>
                              call <span>&#8377;</span>
                              {data.call}/min
                            </button>
                          </Link>
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

export default MeetAstrologers;

