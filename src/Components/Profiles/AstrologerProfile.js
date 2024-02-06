import React from "react";
import { BsChatDotsFill } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
import MetaData from "../../Pages/MetaData";
import Sidebar from "../../Pages/Sidebar";
import OffCanvasNav from "../../Pages/OffCanvasNav";
import "./astro_profile.css";
import { IoStar } from "react-icons/io5";
import { FaUserLarge } from "react-icons/fa6";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

function AstrologerProfile() {
  const { id } = useParams();
  const [isLoading, setIsloading] = useState(false);
  const [astrologer, setAstrologer] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsloading(true);
        const response = await fetch(
          `${process.env.REACT_APP_URL}/api/v1/astrologer/getAstrologer/${id}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          // Handle non-successful response (e.g., 404 Not Found)
          alert(`Error: ${response.status} - ${response.statusText}`);
          return;
        } else {
          setIsloading(false);
          const data = await response.json();
          // console.log(data);
          setAstrologer(data);
          // console.log('astro', astrologers);
        }
      } catch (error) {
        alert("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <MetaData title={"Astro5Star"} />

      <div id="fixedbar">
        <Sidebar />
      </div>
      <div id="offcanvas">
        <OffCanvasNav />
      </div>

      {isLoading ? (
        <div className="loading">
            <p>loading....</p>
          {/* <Spinner animation="grow" variant="warning" className="text-center" /> */}
        </div>
      ) : (
        <main className="infoContainer">
          <div className="wrapper">
            <div className="profile_container">
              <div className="profile_img">
                <div className="astrologer_img">
                  <img src={astrologer?.astrologer.profilePic[0].pic} alt="" />
                </div>
                {/* <button>Follow</button> */}
              </div>
              <div className="profile_details">
                <h1>{astrologer?.astrologer?.displayname}</h1>
                <p>{astrologer?.astrologer?.category}</p>
                <p>{astrologer?.astrologer?.language}</p>
                <p>
                  Exp: {astrologer?.astrologer?.experience}
                  {astrologer?.astrologer?.experience == 1
                    ? "year"
                    : "years"}{" "}
                </p>
                <div className="costs">
                  {" "}
                  <p>
                    call: <span>&#8377;</span>
                    {astrologer?.astrologer?.displaycall}/min
                  </p>{" "}
                  <p>
                    chat: <span>&#8377;</span>
                    {astrologer?.astrologer?.displaychat}/min
                  </p>
                </div>
                <div className="time_taken">
                  <p className="_items">
                    <BsChatDotsFill />
                    <strong>
                      18K <span> mins</span>
                    </strong>
                  </p>{" "}
                  <p className="_items">
                    <FaPhoneAlt />
                    <strong>
                      12K <span> mins</span>
                    </strong>
                  </p>
                </div>
                <div className="start_activity">
                  <button>
                    <p>
                      {" "}
                      <BsChatDotsFill />
                    </p>
                    <p>Start Chat</p>
                  </button>
                  <button>
                    <p>
                      <FaPhoneAlt />
                    </p>
                    <p>Start Chat</p>
                  </button>
                </div>
              </div>
            </div>

            <div className="astrologer_bio">
              <h4>About me</h4>
              <p className="text_bio">{astrologer?.astrologer?.biograph} </p>
            </div>
          </div>
          <div className="rating_wrapper">
            <div className="ratings">
              <h2>Rating & Reviews</h2>
              <div className="rates">
                <div className="rating_points">
                  <h3>4.97</h3>
                  <p className="rate_icons">
                    <IoStar />
                    <IoStar />
                    <IoStar />
                    <IoStar />
                    <IoStar />
                  </p>
                  <p>
                    <FaUserLarge className="rate_icons" />
                    5044 total
                  </p>
                </div>
                <div>
                  <div className="ratiing_bars">
                    <h3>5</h3>
                    <div className="bar" style={{ background: "green" }}></div>
                  </div>
                  <div className="ratiing_bars">
                    <h3>4</h3>
                    <div className="bar"></div>
                  </div>
                  <div className="ratiing_bars">
                    <h3>3</h3>
                    <div className="bar"></div>
                  </div>
                  <div className="ratiing_bars">
                    <h3>2</h3>
                    <div className="bar"></div>
                  </div>
                  <div className="ratiing_bars">
                    <h3>1</h3>
                    <div className="bar"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="similar_consultannt">
              <div className="header_container">
                <h3>Check similar consultannt</h3>
                <AiOutlineInfoCircle />
              </div>
              <div className="list_consultants">
                <div className="cons_details">
                  <div className="cons_profile">
                    <div className="cons_img">
                      <img src="" alt="" />
                    </div>{" "}
                    <h6> Anonymous</h6>
                  </div>
                  <div className="rating_stars">
                    <IoStar />
                    <IoStar />
                    <IoStar />
                    <IoStar />
                    <IoStar />
                  </div>
                  <p className="comments">
                    Great discussion. Highly recommended
                  </p>
                </div>
                <div className="cons_details">
                  <div className="cons_profile">
                    <div className="cons_img">
                      <img src="" alt="" />
                    </div>{" "}
                    <h6> Anonymous</h6>
                  </div>
                  <div className="rating_stars">
                    <IoStar />
                    <IoStar />
                    <IoStar />
                    <IoStar />
                    <IoStar />
                  </div>
                  <p className="comments">
                    Great discussion. Highly recommended
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default AstrologerProfile;
