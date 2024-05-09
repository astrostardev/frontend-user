import React, { useEffect, useState,useRef } from "react";
import "../homeStyleSheets/Home.css";
import arrow_ios from "../../../assests/arrow_forward_ios.svg";
import plus from "../../../assests/plus.svg";
import star from "../../../assests/Star 1.svg";
import search from "../../../assests/search.svg";
import OffCanvasNav from "../../../Pages/OffCanvasNav";
import { Link } from "react-router-dom";
import { Sidebar } from "../../../Pages/Sidebar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import MetaData from "../../../Pages/MetaData";
import LazyLoad from "react-lazy-load";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAstrologer,
  isAstrologerBusy,
} from "../../../action/astrologerAction";
const ENDPOINT = process.env.REACT_APP_SOCKET_URL;

function MeetAstrologers() {
  const { astrologers = [] } = useSelector((state) => state.astroState);
  const { user, token } = useSelector((state) => state.authState);

  const [getAstrologer, setAstrologers] = useState(astrologers);
  const [categories, setCategories] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [searchAstrologer, setSearchAstrologer] = useState(null);
  const [astroIsBusy, setBusy] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [websocket, setWebsocket] = useState(null);
  // get methods from server
  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/method/show`,
        {
          headers: {
            "Content-type": "multipart/form-data",
            // Authorization: `Bearer ${token}`
          },
          method: "GET",
        }
      );
      // console.log(response);
      let data = await response.json();
      console.log(data);

      setCategories(data.categories);
      console.log(categories);
    }
    fetchData();
  }, []);

  // get languages from server
  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/language/show`,
        {
          headers: {
            "Content-type": "multipart/form-data",
            // Authorization: `Bearer ${token}`
          },
          method: "GET",
        }
      );
      // console.log(response);
      let data = await response.json();
      console.log(data);

      setLanguages(data.languages);
      console.log(languages);
    }
    fetchData();
  }, []);

  //display astrologer searched by name
  async function fetchAstrologerByName() {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/astrologer/name?search=${searchAstrologer}`,
        {
          method: "GET", // Use GET method
        }
      );
      const data = await response.json();
      console.log(data);
      setAstrologers(data.astrologer);
      console.log("filterBy name", astrologers);
    } catch (error) {
      console.error("Error fetching astrologers:", error);
    }
  }

  // filtering astrologers by category
  const filterCategoryAstrologer = async (selectedCategory) => {
    console.log("filter", selectedCategory);
    let response = await fetch(
      `${process.env.REACT_APP_URL}/api/v1/astrologer/category?category=${selectedCategory}`,
      {
        method: "GET",
      }
    );
    // console.log(response);
    let data = await response.json();
    console.log(data);

    setAstrologers(data.astrologer);
    console.log(astrologers);
  };

  // filtering astrologers by language
  const filterLanguageAstrologer = async (selectedCategory) => {
    console.log("filter", selectedCategory);
    let response = await fetch(
      `${process.env.REACT_APP_URL}/api/v1/astrologer/language?language=${selectedCategory}`,
      {
        method: "GET",
      }
    );
    // console.log(response);
    let data = await response.json();
    console.log(data);

    setAstrologers(data.astrologer);
    console.log(astrologers);
  };

  // Function to shuffle astrologers array
  useEffect(() => {
    const shuffleAstrologers = () => {
      setAstrologers((preAstrologer) => {
        const shuffledAstrologers = [...preAstrologer];
        for (let i = shuffledAstrologers.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          console.log("j", j);
          console.log("i", i);

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

  const allAstrologer = () => {
    dispatch(getAllAstrologer());
  };
  useEffect(() => {
    setAstrologers(astrologers);
  }, [astrologers]);

  useEffect(() => {
    // Set up the WebSocket connection
    const newSocket = new WebSocket(ENDPOINT);
  
    newSocket.onopen = () => {
      console.log("WebSocket is open");
  
      const setupMessage = {
        type: "setup",
        userId: user?._id,
      };
  
      newSocket.send(JSON.stringify(setupMessage)); // Send after WebSocket is open
      setWebsocket(newSocket); // Store the WebSocket in state
    };
  
    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  
    newSocket.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };
  
    return () => {
      if (newSocket.readyState === WebSocket.OPEN) {
        newSocket.close(); // Ensure proper cleanup
      }
    };
  }, []);
  
  const handleCall = (astrologerId) => {
    const callNotification = {
      type: 'call-initiate',
      astrologerId,
      userId:user?._id

    };

    // Assuming you have a WebSocket connection setup
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify(callNotification));
    }

    // Navigate to the call page
    navigate(`/call_page/${astrologerId}`);
  };
  // Function to create an offer and initiate a call
  // const initiateCall = () => {
  //   if (peerConnection && websocket) {
  //     localStreamRef.current.getTracks().forEach((track) => {
  //       peerConnection.addTrack(track, localStreamRef.current);
  //     });

  //     peerConnection.createOffer()
  //       .then((offer) => {
  //         return peerConnection.setLocalDescription(offer);
  //       })
  //       .then(() => {
  //         websocket.send(JSON.stringify({ type: 'offer', offer: peerConnection.localDescription }));
  //       })
  //       .catch((err) => {
  //         console.error('Error creating offer:', err);
  //       });
  //   }
  // };

  // Function to handle received signaling messages
  useEffect(() => {
    if (websocket) {
      websocket.onmessage = (message) => {
        const data = JSON.parse(message.data);

        if (data.type === 'offer') {
          peerConnection.setRemoteDescription(data.offer)
            .then(() => peerConnection.createAnswer())
            .then((answer) => peerConnection.setLocalDescription(answer))
            .then(() => websocket.send(JSON.stringify({ type: 'answer', answer: peerConnection.localDescription })))
            .catch((err) => console.error('Error handling offer:', err));
        } else if (data.type === 'answer') {
          peerConnection.setRemoteDescription(data.answer)
            .catch((err) => console.error('Error handling answer:', err));
        } else if (data.type === 'ice-candidate') {
          peerConnection.addIceCandidate(data.candidate)
            .catch((err) => console.error('Error adding ICE candidate:', err));
        }
      };
    }
  }, [websocket, peerConnection]);
 

  return (
    <>
      <MetaData title={"Astro5Star"} />

      <div id="fixedbar">
        <Sidebar />
      </div>
      <div id="offcanvas">
        <OffCanvasNav />
      </div>
      <main className="infoContainer">
        {/* search astrologer */}
        <div className="search_space">
          <div className="search_div">
            <img src={search} alt="" />
            <input
              type="text"
              onChange={(e) => {
                setSearchAstrologer(e.target.value);
                fetchAstrologerByName();
              }}
              placeholder="search"
            />
          </div>

          {/* <div className="filter_btn">
            <button>
              {" "}
              <img src={line} alt="" />
              Filter
            </button>
            <button>
              {" "}
              <img src={group} alt="" /> Sort
            </button>
          </div> */}
        </div>

        <div className="container-fluid ">
          {/* filtering astrologers */}
          <div className="meet_astro_option">
            <h4> Meet Astrologers</h4>
            <div className="astro_drop_btn button_container">
              <button className="all" onClick={allAstrologer}>
                All <img src={arrow_ios} alt="" />
              </button>
              <DropdownButton id="dropdown-item-button" title="Methodology">
                {categories?.map((cat) => (
                  <Dropdown.Item
                    key={cat.category[0]?.name}
                    onClick={() =>
                      filterCategoryAstrologer(cat.category[0]?.name)
                    }
                  >
                    {cat.category[0]?.name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
              <DropdownButton id="dropdown-item-button" title="Languages">
                {languages?.map((cat) => (
                  <Dropdown.Item
                    key={cat.language[0]?.name}
                    onClick={() =>
                      filterLanguageAstrologer(cat.language[0]?.name)
                    }
                  >
                    {cat.language[0]?.name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
          </div>

          {/* displaying astrologers */}
          <div className=" top_astrologers">
            <div className="meet_header">
              <h4 className="top_astro">Top Astrologers</h4>
            </div>

            <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3  row-cols-md-2 row-cols-xl-4 g-2 astrologer_container">
              {getAstrologer?.map((data) => (
                <div className="col" key={data.id} id="card_width">
                  <div className="card">
                    <div>
                      <div className="astro_detail">
                        <div
                          className="astro_img"
                          onClick={() =>
                            navigate(`/astrologer_profile/${data?._id}`)
                          }
                        >
                          <LazyLoad height={85}>
                            <img src={data?.profilePic[0]?.pic} alt="" />
                          </LazyLoad>
                        </div>
                        <div className="about_astrologer">
                          <h4 className="name"> {data.displayname}</h4>
                          <div>
                            <button className="add">
                              <img src={plus} alt="" />
                            </button>
                            <button className="rating">
                              <img src={star} alt="" /> 4.2
                            </button>
                          </div>
                        </div>
                        {data?.callAvailable === true ||
                        data?.chatAvailable === true ? (
                          <div className="availableDot"></div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="about_astro">
                        <span className="astro_category">
                          {data.category}
                        </span>
                        <span className="astro_category">{data.language}</span>
                        <span>Exp: {data.experience} yrs</span>
                      </div>
                      <div className="charge_btns">
                        <Link
                          to={`/chats/${data?._id}`}
                          onClick={() =>
                            dispatch(isAstrologerBusy(astroIsBusy, data?._id))
                          }
                        >
                          <button disabled={data?.isBusy}>
                            Chat <span>&#8377;</span>
                            {data.displaychat}/min
                          </button>
                        </Link>

                        {/* <Link to={`/call_page/${data?._id}`}> */}

                          <button onClick={()=>handleCall(data?._id)}>
                            Call <span>&#8377;</span>
                            {data.displaycall}/min
                          </button>
                        {/* </Link> */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default MeetAstrologers;
