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
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import MetaData  from "../../../Pages/MetaData";
function MeetAstrologers(props) {
  const [astrologers, setAstrologers] = useState();
 const[categories,setCategories]= useState(null)
 const[languages,setLanguages]= useState(null);
 const[filterCat,setFilterCat]=useState('')

  useEffect(() => {
    async function fetchData() {
        let response = await fetch(`${process.env.REACT_APP_URL}/api/v1/method/show`, {
            headers: {
                'Content-type': 'multipart/form-data',
                // Authorization: `Bearer ${token}`
            },   
        method: "GET",
        });
        // console.log(response);
        let data = await response.json();
        console.log(data)
        
        setCategories(data.categories)
        console.log(categories);
    }
    fetchData();
}, []);
useEffect(() => {
  async function fetchData() {
      let response = await fetch(`${process.env.REACT_APP_URL}/api/v1/language/show`, {
          headers: {
              'Content-type': 'multipart/form-data',
              // Authorization: `Bearer ${token}`
          },   
      method: "GET",
      });
      // console.log(response);
      let data = await response.json();
      console.log(data)

      setLanguages(data.languages)
      console.log(languages);
  }
  fetchData();
}, []);

useEffect(()=>{
 
fetchData()
},[])
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
   



  const filterCategoryAstrologer = async(selectedCategory)=>{
    console.log('filter',selectedCategory);
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
    
  }

  const filterLanguageAstrologer = async(selectedCategory)=>{
    console.log('filter',selectedCategory);
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
    
  }
  return (
    <div>
        <MetaData title={'Astro5Star'} />

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
              <button className="all" onClick={ fetchData}>
                All <img src={arrow_ios} alt="" styl/>
              </button>
              <DropdownButton id="dropdown-item-button" title="Methodology">
                {categories?.map((cat)=>(
                <Dropdown.Item  key={cat.category[0]?.name} onClick={() => filterCategoryAstrologer(cat.category[0]?.name)}>{cat.category[0]?.name}</Dropdown.Item>

                ))}
            
              </DropdownButton>
              <DropdownButton id="dropdown-item-button" title="Languages">
                {languages?.map((cat)=>(
                <Dropdown.Item key={cat.language[0]?.name} onClick={() => filterLanguageAstrologer(cat.language[0]?.name)} >{cat.language[0]?.name}</Dropdown.Item>

                ))}
          
              </DropdownButton>
            </div>
          </div>
          <div className=" top_astrologers">
            <div className="meet_header">
              <h4 className="top_astro">Top Astrologers</h4>
            </div>
            <div>
              <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-2 astrologer_container">
                {astrologers?.map((data) => (
                  <div class="col" style={{ width: "300px" }}>
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
                              {data.displaychat}/min
                            </button>
                          </Link>
                          <Link
                            className=""
                            to="/call"
                            style={{ color: "black" }}
                          >
                            <button>
                              call <span>&#8377;</span>
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
        </div>
      </main>
    </div>
  );
}

export default MeetAstrologers;
