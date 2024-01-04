import "../Stylesheets/sidebar.css";
import Logo from "../assests/logo green.png";
import { BsCash, BsChatLeftText } from "react-icons/bs";
import { RiHistoryFill } from "react-icons/ri";
import { MdAddToQueue, MdArrowDropDown, MdOutlineCall } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { FiHelpCircle } from "react-icons/fi";
import { Link} from "react-router-dom";
import { PiWalletBold } from "react-icons/pi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import astrologer from "../assests/astro1.svg";
import facebook from "../assests/Facebook.svg";
import twitter from "../assests/Twitter.svg";
import insta from "../assests/Instagram.svg";
import youtube from "../assests/YouTube.svg";
import whatsapp from "../assests/WhatsApp.svg";
import { RiHomeLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout, userRecharge } from "../action/userAction";
import { useState, useEffect,useCallback } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { showPackages,getRechargePackage, getPackage } from "../action/packageAction";


function MyVerticallyCenteredModal(props) {
  const { user } = useSelector((state) => state.authState);
  const { packages } = useSelector((state) => state.packageState);
  const { updatedPackage } = useSelector((state) => state.packageState);
  console.log("single", updatedPackage);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(showPackages());
  }, [dispatch]);

  const fetchSingleData = async (id) => {
    try {
       await dispatch(getRechargePackage(id))
     
    } catch (error) {
      console.error("Error fetching single data:", error);
    }
  };

  const postData = useCallback(async () => {
    console.log('updated', updatedPackage);
    const packid = user?._id;
    console.log("id", packid);
    dispatch(userRecharge(packid, { packages: updatedPackage }));
  }, [updatedPackage, dispatch, user?._id]); 
  
  
  const handleRequest = async (id) => {
    try {
      await fetchSingleData(id);
   
      setTimeout(async () => {
        await postData();
      }, 5000);
     
    } catch (error) {
      console.error("Error handling request:", error);
 
    }
  };



  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Packages</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table responsive>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Price</th>
              <th>Package Name</th>
              <th>Package Detail</th>
              <th>Button</th>
            </tr>
          </thead>
          <tbody>
            {packages?.map((data, index) => (
              <>
                <tr key={data._id}>
                  <td>{index + 1}</td>

                  <td>{data?.fixedPrice}</td>
                  <td>{data?.packageName}</td>
                  <td>{data?.packageDetail}</td>
                  <td>
                    <Button
                      onClick={() => {
                        handleRequest(data._id);
                        props.onHide();
                      }}
                    >
                      Recharge
                    </Button>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
function Sidebar() {
  const { user } = useSelector((state) => state.authState);

  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  function toggledropdown() {
    let content = document.querySelector(".drop-content");
    content.classList.toggle("toggle-content");
  }

  function closedropdown() {
    let content = document.querySelector(".drop-content");
    content.classList.remove("toggle-content");
  }

  function toggleHistory() {
    let historydrop = document.querySelector(".historydrop-container");
    historydrop.classList.toggle("open-history");
  }

  // const dropTwo = useRef(null)
  // const handleDroptwo = (e) => {
  //     if (!dropTwo.current.contains(e.target)) {
  //         closedropdown()
  //     }
  // }
  // useEffect(() => {
  //     document.addEventListener("click", handleDroptwo, true)
  // }, [])

  const logoutHandler = () => {
    dispatch(logout);
  };
  return (
    <>
      <aside id="side">
        <div className="logoContainer">
          <img src={Logo} alt="logo" />
        </div>
        <div className="divider"></div>
        <section className="side-menu">
          <Link className="side-link" to="/home">
            <RiHomeLine style={{ fontSize: "20px" }} />
            <span>Home</span>
          </Link>
          <Link className="side-link" to="/chat">
            <BsChatLeftText style={{ fontSize: "20px" }} />
            <span>Chat </span>
          </Link>
          <Link className="side-link" to="/call">
            <MdOutlineCall style={{ fontSize: "20px" }} />
            <span>Call</span>
          </Link>
          <button className="side-link" onClick={toggleHistory}>
            <RiHistoryFill style={{ fontSize: "20px" }} />
            History
            <MdArrowDropDown style={{ fontSize: "20px", marginLeft: "40px" }} />
          </button>
          <div className="historydrop-container">
            <Link className="history-link" to="/chat_history">
              <BsChatLeftText style={{ fontSize: "20px" }} />
              <span>Chat</span>
            </Link>
            <Link className="history-link" to="/call_history">
              <MdOutlineCall style={{ fontSize: "20px" }} />
              <span>Call</span>
            </Link>
          </div>

          <Link className="side-link" to="/settings">
            <AiOutlineSetting style={{ fontSize: "20px" }} />
            <span>Settings</span>
          </Link>
          <Link className="side-link">
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
      <main>
        <header id="head">
          <article>
            <h4>
              Hello <span style={{ color: "#229e48" }}>Raghavendraswamyar</span>
            </h4>
          </article>
          <div>
            {/* Earning */}
            <div className="earning">
              <Link to="/wallet" style={{ color: "black" }}>
                <PiWalletBold style={{ fontSize: "25px" }} />
              </Link>
              <span>
                ₹{user?.packages ? user?.packages?.totalAmount : "0"}
              </span>
              <Button variant="primary" onClick={() => setModalShow(true)}>
                Recharge
              </Button>
            </div>
            <IoMdNotificationsOutline style={{ fontSize: "25px" }} />

            {/* Profile */}
            <div className="profileDrop">
              <button className="dropbtn" onClick={toggledropdown}>
                <img src={astrologer} alt="astrologer" className="astrologer" />
                <div style={{ marginTop: "5px" }}>
                  <RiArrowDropDownLine style={{ fontSize: "25px" }} />
                </div>
              </button>
              <div className="drop-content">
                <Link
                  to="/profile"
                  className="drop-link"
                  onClick={closedropdown}
                >
                  Your Profile
                </Link>

                <Link to="/login" className="drop-link" onClick={logoutHandler}>
                  Logout
                </Link>
              </div>
            </div>

            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        </header>
      </main>
    </>
  );
}

export default Sidebar;
