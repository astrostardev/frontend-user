import React, { useState } from "react";
import Sidebar from "./Sidebar";
import OffCanvasNav from "./OffCanvasNav";
import "../Stylesheets/wallet.css";
import astro1 from "../assests/astro1.svg";
import cardbg from "../assests/bg-orange.jpeg";
import { useSelector } from "react-redux";
import MetaData from "../Pages/MetaData";
function Wallet(props) {
  const [showTrans, setShowTrans] = useState(1);
  const { user } = useSelector((state) => state.authState);

  const handleClick = (e) => {
    setShowTrans(e);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
        <MetaData title={'Astro5Star-Wallet'} />

      <div id="fixedbar">
        <Sidebar />
      </div>
      <div id="offcanvas">
        <OffCanvasNav />
      </div>
      <div className="wallet_cards">
        <div className="card show_balance">
          <div style={{ display: "flex", gap: "20px" }}>
            <h4>Available Balance</h4>
            <h4>
              <span>&#8377;</span> {user?.packages?.totalAmount}
            </h4>
          </div>
          <button>Recharge</button>
        </div>
        <div className="card show_transaction">
          <h4>Transcation History</h4>
          <div>
            <button
              onClick={() => handleClick(1)}
              className={showTrans === 1 ? "active-btn" : ""}
            >
              All
            </button>
            <button
              onClick={() => handleClick(2)}
              className={showTrans === 2 ? "active-btn" : ""}
            >
              Recharge
            </button>
            <button
              onClick={() => handleClick(3)}
              className={showTrans === 3 ? "active-btn" : ""}
            >
              {" "}
              Spend{" "}
            </button>
          </div>
          <div className={showTrans === 1 ? "" : "d-none"} id="trans_tbl">
            <table class="table table-striped">
              <tbody>
                <tr className="data">
                  <td className="trans_detail">
                    {" "}
                    <img src={astro1} alt="astro1" />{" "}
                    <span>
                      Mark
                      <p style={{ color: "gray" }}>Yesturday 04:30 PM</p>{" "}
                    </span>{" "}
                  </td>
                  <td style={{ color: "red" }}>-2000</td>
                </tr>
                <tr className="data">
                  <td className="trans_detail">
                    {" "}
                    <img src={astro1} alt="astro1" />{" "}
                    <span>
                      Mark
                      <p style={{ color: "gray" }}>Yesturday 04:30 PM</p>{" "}
                    </span>{" "}
                  </td>
                  <td style={{ color: "red" }}>-2000</td>
                </tr>
                <tr>
                  <td className="trans_detail">
                    {" "}
                    <img src={astro1} alt="astro1" />{" "}
                    <span>
                      Mark
                      <p style={{ color: "gray" }}>Yesturday 04:30 PM</p>
                    </span>
                  </td>
                  <td style={{ color: "red" }}>-500</td>
                </tr>
                <tr>
                  <td className="trans_detail">
                    {" "}
                    <img src={astro1} alt="astro1" />{" "}
                    <span>
                      Mark
                      <p style={{ color: "gray" }}>Yesturday 04:30 PM</p>
                    </span>
                  </td>
                  <td style={{ color: "green" }}>+1000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={showTrans === 2 ? "" : "d-none"} id="trans_tbl">
            <table class="table table-striped">
              <tbody>
              <tr className="data">
                  <td className="trans_detail">
                    {" "}
                    <img src={astro1} alt="astro1" />{" "}
                    <span>
                      Mark
                      <p style={{ color: "gray" }}>Yesturday 04:30 PM</p>{" "}
                    </span>{" "}
                  </td>
                  <td style={{ color: "green" }}>{user?.packages?.totalAmount}</td>
                </tr>
                <tr className="data">
                  <td className="trans_detail">
                    {" "}
                    <img src={astro1} alt="astro1" />{" "}
                    <span>
                      Mark
                      <p style={{ color: "gray" }}>Yesturday 04:30 PM</p>{" "}
                    </span>{" "}
                  </td>
                  <td style={{ color: "green" }}>+2000</td>
                </tr>
                <tr>
                  <td className="trans_detail">
                    {" "}
                    <img src={astro1} alt="astro1" />{" "}
                    <span>
                      Mark
                      <p style={{ color: "gray" }}>Yesturday 04:30 PM</p>
                    </span>
                  </td>
                  <td style={{ color: "green" }}>+500</td>
                </tr>
                <tr>
                  <td className="trans_detail">
                    {" "}
                    <img src={astro1} alt="astro1" />{" "}
                    <span>
                      Mark
                      <p style={{ color: "gray" }}>Yesturday 04:30 PM</p>
                    </span>
                  </td>
                  <td style={{ color: "green" }}>+1000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={showTrans === 3 ? "" : "d-none"} id="trans_tbl">
            <table class="table table-striped">
              <tbody>
              <tr className="data">
                  <td className="trans_detail">
                    {" "}
                    <img src={astro1} alt="astro1" />{" "}
                    <span>
                      Mark
                      <p style={{ color: "gray" }}>Yesturday 04:30 PM</p>{" "}
                    </span>{" "}
                  </td>
                  <td style={{ color: "red" }}>-2000</td>
                </tr>
                <tr className="data">
                  <td className="trans_detail">
                    {" "}
                    <img src={astro1} alt="astro1" />{" "}
                    <span>
                      Mark
                      <p style={{ color: "gray" }}>Yesturday 04:30 PM</p>{" "}
                    </span>{" "}
                  </td>
                  <td style={{ color: "red" }}>-2000</td>
                </tr>
                <tr>
                  <td className="trans_detail">
                    {" "}
                    <img src={astro1} alt="astro1" />{" "}
                    <span>
                      Mark
                      <p style={{ color: "gray" }}>Yesturday 04:30 PM</p>
                    </span>
                  </td>
                  <td style={{ color: "red" }}>-500</td>
                </tr>
                <tr>
                  <td className="trans_detail">
                    {" "}
                    <img src={astro1} alt="astro1" />{" "}
                    <span>
                      Mark
                      <p style={{ color: "gray" }}>Yesturday 04:30 PM</p>
                    </span>
                  </td>
                  <td style={{ color: "red" }}>-1000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
