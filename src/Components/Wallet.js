import React, { useState } from "react";
import Sidebar from "../Pages/Sidebar";
import OffCanvasNav from "../Pages/OffCanvasNav";
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
      <MetaData title={"Astro5Star-Wallet"} />

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
              <span>&#8377;</span> {user?.balance}
            </h4>
          </div>
          {/* <button>Recharge</button> */}
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
                {user?.rechargePrice?.map((data) => (
                  <tr>
                    <td className="wallet-container">
                      
                        <p className="con-icon">{user?.name[0]}</p>
                        <p className="con-title">{user?.name}</p>
                        <p
                          style={{ color: "gray" }}
                          className="con-lastMessage"
                        >
                          
                          {new Date(data.date).toLocaleString("en-IN", {
                              timeZone: "Asia/Kolkata",
                              hour12: true,
                            })}
                        </p>
                        <p className="con-timeStamp">{data?.price}</p>
                      
                    </td>
                  </tr>
                ))}
               
              </tbody>
            </table>
          </div>
          <div className={showTrans === 2 ? "" : "d-none"} id="trans_tbl">
            <table class="table table-striped">
              <tbody>
              {user?.rechargePrice?.map((data) => (
                  <tr>
                    <td className="wallet-container">
                      
                        <p className="con-icon">{user?.name[0]}</p>
                        <p className="con-title">{user?.name}</p>
                        <p
                          style={{ color: "gray" }}
                          className="con-lastMessage"
                        >
                           
                           {new Date(data.date).toLocaleString("en-IN", {
                              timeZone: "Asia/Kolkata",
                              hour12: true,
                            })}
                        </p>
                        <p className="con-timeStamp" style={{color:"green"}}>{data?.price}</p>
                      
                    </td>
                  </tr>
                ))}
               
              </tbody>
            </table>
          </div>
          <div className={showTrans === 3 ? "" : "d-none"} id="trans_tbl">
            <table class="table table-striped">
              <tbody>
              {user?.rechargePrice?.map((data) => (
                  <tr>
                    <td className="wallet-container">
                      
                        <p className="con-icon">{user?.name[0]}</p>
                        <p className="con-title">{user?.name}</p>
                        <p
                          style={{ color: "gray" }}
                          className="con-lastMessage"
                        >
                           
                           {new Date(data.date).toLocaleString("en-IN", {
                              timeZone: "Asia/Kolkata",
                              hour12: true,
                            })}
                        </p>
                        <p className="con-timeStamp" style={{color:"green"}}>{data?.price}</p>
                      
                    </td>
                  </tr>
                ))}
             
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
