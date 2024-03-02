import React, { useEffect, useState } from "react";
import "../homeStyleSheets/Home.css";
import arrow_ios from "../../../assests/arrow_forward_ios.svg";
import plus from "../../../assests/plus.svg";
import star from "../../../assests/Star 1.svg";
import search from "../../../assests/search.svg";
import group from "../../../assests/Group.svg";
import line from "../../../assests/horizontalLine.svg";
import OffCanvasNav from "../../../Pages/OffCanvasNav";
import { Link } from "react-router-dom";
import Sidebar from "../../../Pages/Sidebar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import MetaData from "../../../Pages/MetaData";
import LazyLoad from "react-lazy-load";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function MeetAstrologers(props) {
  const [astrologers, setAstrologers] = useState();
  const [categories, setCategories] = useState(null);
  const [languages, setLanguages] = useState(null);
  const[searchAstrologer,setSearchAstrologer]=useState(null)
  const { user, token } = useSelector((state) => state.authState);

  const navigate = useNavigate()
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

  useEffect(() => {
    fetchData();
  }, []);

  // displaying all astrologers
  async function fetchData() {
    let response = await fetch(
      `${process.env.REACT_APP_URL}/api/v1/astrologer/allAstrologers`,
      {
        method: "GET",
      }
    );
    // console.log(response);
    let data = await response.json();
    console.log(data);

    setAstrologers(data.astrologers);
    console.log(astrologers);
  }
  //sending userId
  async function sendUserId() {
    console.log('userId', user?._id);
    let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/user/getuser`,
        {
            headers: {
                "Content-Type": "application/json", // Corrected Content-Type
                Authorization: `Bearer ${token}`
            },
            method: "POST",
            body: JSON.stringify({ id: user._id }) // Pass user ID as an object
        }
    );
    console.log(response);
}


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
      console.log('filterBy name',astrologers);
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
            <input type="text" onChange={(e)=>{setSearchAstrologer(e.target.value); fetchAstrologerByName()}} placeholder="search" />
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
          {/* filtering astrologers */}
          <div className="meet_astro_option">
            <h4> Meet Astrologers</h4>
            <div className="astro_drop_btn button_container">
              <button className="all" onClick={fetchData}>
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
              {astrologers?.map((data) => (
                <div className="col" key={data.id} id="card_width">
                  <div className="card">
                    <div>
                      <div className="astro_detail">
                        <div className="astro_img" onClick={()=> navigate(`/astrologer_profile/${data?._id}`)} >
                        
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
                       {data?.callAvailable == true || data?.chatAvailable == true ? <div className="availableDot"></div> : ''}
                      </div>

                      <div className="about_astro">
                        <span>{data.category}</span>
                        <span>{data.language}</span>
                        <span>Exp: {data.experience} years</span>
                      </div>
                      <div className="charge_btns">
                        <Link to={`/chats/${data?._id}`} >
                          <button onClick={sendUserId}>
                            Chat <span>&#8377;</span>
                            {data.displaychat}/min
                          </button>
                        </Link>
                        <Link to="/call">
                          <button>
                            Call <span>&#8377;</span>
                            {data.displaycall}/min
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
      </main>
    </>
  );
}

export default MeetAstrologers;
