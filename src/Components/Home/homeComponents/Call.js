import React, { useState, useEffect } from "react";
import plus from "../../../assests/plus.svg";
import star from "../../../assests/Star 1.svg";
import OffCanvasNav from "../../../Pages/OffCanvasNav";
import { Link } from "react-router-dom";
import { Sidebar } from "../../../Pages/Sidebar";
import "../homeStyleSheets/Home.css";
import "../homeStyleSheets/Chat.css";
import MetaData from "../../../Pages/MetaData";
import { useSelector } from "react-redux";
function Call(props) {
  const { callAvailable = [] } = useSelector((state) => state.astroState);
  const [getAstrologers, setAstrologers] = useState(callAvailable);

  // Function to shuffle astrologers array
  useEffect(() => {
    const shuffleAstrologers = () => {
      setAstrologers((preAstrologer) => {
        const shuffledAstrologers = [...preAstrologer];
        for (let i = shuffledAstrologers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledAstrologers[i], shuffledAstrologers[j]] = [
            shuffledAstrologers[j],
            shuffledAstrologers[i],
          ];
        }
        return shuffledAstrologers;
      });
    };

    shuffleAstrologers();
    const intervalId = setInterval(shuffleAstrologers, 10000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <MetaData title={"Astro5Star-Call"} />

      <div id="fixedbar">
        <Sidebar />
      </div>
      <div id="offcanvas">
        <OffCanvasNav />
      </div>
      <main className="infoContainer">
        <h4 style={{ margin: "30px", marginLeft: "20px" }}>Call</h4>
        <div className="header_dec"></div>

        <div className="container-fluid">
          <div className=" top_astrologers chat_astrologer" id="mobile_view">
            <div className="meet_header">
              <h4 className="top_astro">Available Astrologers</h4>
            </div>
            <div>
              <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3  row-cols-md-2 row-cols-xl-4 g-2 astrologer_container">
                {getAstrologers?.map((data) => (
                  <div class="col" id="card_width">
                    <div className="card" key={data.id}>
                      {" "}
                      {/* Added a unique key */}
                      <div>
                        <div className="astro_detail">
                          <div className="astro_img">
                            <img src={data?.profilePic[0]?.pic} alt="" />
                          </div>
                          <div className="about_astrologer">
                            <h4>{data.displayname}</h4>
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
                          <span>{data.category}</span>
                          <span>{data.language}</span>
                          <span>Exp:{data.experience} years</span>
                        </div>
                        <div
                          className="charge_btns"
                          style={{
                            justifyContent: "flex-start",
                            marginLeft: "10px",
                          }}
                        >
                          {/* <Link className='' to='/chat' style={{color:"black"}}><button>
                            chat <span>&#8377;</span>
                            {data.chat}/min
                          </button></Link> */}
                          <Link
                            className=""
                            to="/call"
                            style={{ color: "black" }}
                          >
                            <button>
                              call <span>&#8377;</span>
                              {data.dispalycall}/min
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

export default Call;
