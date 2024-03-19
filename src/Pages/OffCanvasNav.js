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
import { Link, useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import facebook from "../assests/Facebook.svg";
import twitter from "../assests/Twitter.svg";
import insta from "../assests/Instagram.svg";
import youtube from "../assests/YouTube.svg";
import whatsapp from "../assests/WhatsApp.svg";
import { RiHomeLine } from "react-icons/ri";
import { logout, userRecharge } from "../action/userAction";
import { useDispatch, useSelector } from "react-redux";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { LiaWalletSolid } from "react-icons/lia";
import { Button, Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { getPackage } from "../action/packageAction";

function MyVerticallyCenteredModal(props) {
  const { user } = useSelector((state) => state.authState);
  const { packages } = useSelector((state) => state.packageState);
  const { singlePackage } = useSelector((state) => state.packageState);
  const [showPackages, setShowPackages] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const dispatch = useDispatch();
  const [showModel, setModalShow] = useState(false);

  useEffect(() => {
    async function fetchData() {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/package/show`,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
          method: "GET",
        }
      );
      let data = await response.json();
      setIsloading(false);
      setShowPackages(data.packages);
    }
    fetchData();
  }, [packages]);

  const postData = async () => {
    const userid = user?._id;
    dispatch(userRecharge(userid, { packages: singlePackage }));
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Packages{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowX: "auto" }}>
          <Table responsive>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Price</th>
                <th>Package Name</th>
                <th>Package Detail</th>
                <th>Select Package</th>
                <th>Button</th>
              </tr>
            </thead>
            {isLoading ? (
              <div className="loading">
                <Spinner
                  animation="grow"
                  variant="warning"
                  className="text-center"
                />
              </div>
            ) : (
              <tbody>
                {showPackages?.map((data, index) => (
                  <tr key={data?._id}>
                    <td> {index + 1}</td>
                    <td className="td_width">{data?.fixedPrice}</td>
                    <td className="package_name td_width">
                      {data?.packageName}
                    </td>
                    <td className="td_width">{data?.packageDetail}</td>
                    <td className="check-box">
                      <input
                        type="checkbox"
                        onClick={() => dispatch(getPackage(data?._id))}
                      />
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          postData();
                          props.onHide();
                        }}
                        className="modal_btn"
                      >
                        Recharge
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} className="modal_btn">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function UserRechargeDetailModal(props) {
  const { user } = useSelector((state) => state.authState);
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton id="pckg_header">
          <Modal.Title id="contained-modal-title-vcenter">
            Packages Details
          </Modal.Title>
          <Button
            onClick={() => {
              setModalShow(true);
              props.onHide();
            }}
            className="modal_btn"
          >
            New recharge
          </Button>
        </Modal.Header>
        {user?.packages == "" ? (
          <span className="alert-msg">You haven't recharged anything</span>
        ) : (
          <Modal.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Price</th>
                  <th>Package Name</th>
                  <th>Package Detail</th>
                  <th>Reacharge Date</th>
                </tr>
              </thead>
              {isLoading ? (
                <div className="loading">
                  <Spinner
                    animation="grow"
                    variant="warning"
                    className="text-center"
                  />
                </div>
              ) : (
                <tbody>
                  {user?.packages?.map((packageData, index) => (
                    <tr key={packageData?._id}>
                      <td>{index + 1}</td>
                      <td className="package_name">
                        {packageData?.packageName}
                      </td>
                      <td>{packageData?.packageDetail}</td>
                      <td>{packageData?.fixedPrice}</td>
                      <td>
                        {user?.rechargePrice?.find(
                          (recharge) =>
                            recharge.name === packageData.packageName
                        )?.date
                          ? new Date(
                              user?.rechargePrice?.find(
                                (recharge) =>
                                  recharge.name === packageData.packageName
                              )?.date
                            ).toLocaleString("en-IN", {
                              timeZone: "Asia/Kolkata",
                              hour12: true,
                            })
                          : "No date found"}{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </Table>
          </Modal.Body>
        )}

        <Modal.Footer>
          <Button onClick={props.onHide} className="modal_btn">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
function Offcanvas() {
  const { user } = useSelector((state) => state.authState);
  const [userRechargeShow, setUserRechargeShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  function toggledroppaydown() {
    let content = document.querySelector("#drop");
    content.classList.toggle("payment-content");
  }

  function closedroppaydown() {
    let content = document.querySelector(".drop");
    content.classList.remove("payment-content");
  }
  function toggleHis() {
    let historydrop = document.querySelector(".history-container");
    historydrop.classList.toggle("open-hist");
  }
  const logoutHandler = () => {
    dispatch(logout);
    navigate("/");
  };
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
            <RiCloseLine
              style={{ fontSize: "25px", color: "#229e48" }}
              onClick={closeCanvas}
            />
          </div>
        </div>
        <div className="divider"></div>
        <section className="side-menu">
          <Link className="side-link" to="/home" onClick={closeCanvas}>
            <RiHomeLine style={{ fontSize: "20px" }} />
            <span>Home</span>
          </Link>
          <Link className="side-link" to="/wallet" onClick={closeCanvas}>
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
            <Link
              className="hist-link"
              to="/chat_history"
              onClick={closeCanvas}
            >
              <BsChatLeftText style={{ fontSize: "20px" }} />
              <span>Chat</span>
            </Link>
            <Link
              className="hist-link"
              to="/call_history"
              onClick={closeCanvas}
            >
              <MdOutlineCall style={{ fontSize: "20px" }} />
              <span>Call</span>
            </Link>
          </div>

          {/* <Link className="side-link" to="/settings" onClick={closeCanvas}>
            <AiOutlineSetting style={{ fontSize: "20px" }} />
            <span>Settings</span>
          </Link> */}
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
            <IoMdNotificationsOutline style={{ fontSize: "25px" }} />

            {/* Earning */}
            <span>₹{user?.packages ? user?.balance : "0"}</span>
            <div className="payDrop" id="payDrop">
              <button className="paydropbtn" onClick={toggledroppaydown}>
                <LiaWalletSolid style={{ fontSize: "25px" }} />
                <div style={{ marginTop: "5px" }}>
                  <RiArrowDropDownLine style={{ fontSize: "25px" }} />
                </div>
              </button>
              <div className="paydrop" id="drop">
                <p
                  onClick={() => {
                    closedroppaydown();
                    setUserRechargeShow(true);
                  }}
                >
                  Recharge
                </p>
                <hr />
                <Link to="/profile">Wallet</Link>
                {/* <Link href="#" onClick={closedropdown}>
                  Logout
                </Link> */}
              </div>
            </div>

            {/* Profile */}
            <div className="profileDrop">
              <button className="dropbtn" onClick={toggledropdown}>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip id="tooltip-disabled" className="tooltip_name">
                      {user?.name}
                    </Tooltip>
                  }
                >
                  <span
                    className="user-icon"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Tooltip on bottom"
                  >
                    {user && user.name ? user.name[0] : ""}
                  </span>
                </OverlayTrigger>
                <div style={{ marginTop: "5px" }}>
                  <RiArrowDropDownLine style={{ fontSize: "25px" }} />
                </div>
              </button>
              <div className="drop">
                <Link to="/profile" onClick={closedropdown}>
                  Your Profile
                </Link>
                <hr />
                <p onClick={logoutHandler}>Logout</p>
                {/* <Link href="#" onClick={closedropdown}>
                  Logout
                </Link> */}
              </div>
            </div>
            <UserRechargeDetailModal
              show={userRechargeShow}
              onHide={() => setUserRechargeShow(false)}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default Offcanvas;
