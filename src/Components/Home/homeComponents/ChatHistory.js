import "../homeStyleSheets/ChatHistory.css";
import Table from "react-bootstrap/Table";
import { Sidebar } from "../../../Pages/Sidebar";
import OffCanvasNav from "../../../Pages/OffCanvasNav";
import MetaData from "../../../Pages/MetaData";
import { useState } from "react";
import { useSelector } from "react-redux";
import { extractTime } from "../../../utils/extractTime";
import { Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ChatHistory() {
  const { user } = useSelector((state) => state.authState);
  const [chatHistory, setChatHistory] = useState(user?.chatDetails);
   const navigate = useNavigate()
  return (
    <div>
      <MetaData title={"Astro5Star-ChatHistory"} />
      <div id="fixedbar">
        <Sidebar />
      </div>
      <div id="offcanvas">
        <OffCanvasNav />
      </div>
      <main id="chatHistory" className="infoContainer">
        <section className="earnHead">
          <div>
            <h4>Chat History</h4>
            <div
              style={{
                height: "3px",
                width: "75px",
                backgroundColor: "#229e48",
                borderRadius: "10px",
                marginTop: "3px",
              }}
            ></div>
          </div>
          <select
            className="form-select form-select-sm mb-3 earnFilter"
            aria-label="Large select example"
          >
            <option defaultValue>Period</option>
            <option value="187">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </section>
        <section className="earnTable">
          <Table
            className="table-striped-columns table-striped-order-even"
            responsive="sm"
            hover
            style={{ width: "100%" }}
          >
            <thead class="table-dark">
              <tr style={{ height: "50px" }}>
                <th>S.no</th>
                <th>Client's Name</th>
                <th>Date</th>
                <th>Time (in Mins)</th>
                <th>Amount (₹)</th>
                <th>Details</th>

              </tr>
            </thead>
            <tbody className="table-group-divider">
              {chatHistory?.map((chat, index) => {
                return (
                  <tr style={{ height: "50px" }}>
                    <td>{index + 1}</td>
                    <td style={{ textTransform: "capitalize" }}>
                      {chat &&
                        chat.sameAstrologer &&
                        chat.sameAstrologer.length > 0 &&
                        chat.sameAstrologer[chat.sameAstrologer.length - 1]
                          .astrologer}
                    </td>
                    <td>
                      {new Date(
                        chat &&
                          chat.sameAstrologer &&
                          chat.sameAstrologer.length > 0 &&
                          chat.sameAstrologer[chat.sameAstrologer.length - 1]
                            .date
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      ,{" "}
                      {extractTime(
                        chat &&
                          chat.sameAstrologer &&
                          chat.sameAstrologer.length > 0 &&
                          chat.sameAstrologer[chat.sameAstrologer.length - 1]
                            .date
                      )}
                    </td>

                    <td>
                      {" "}
                      {chat &&
                        chat.sameAstrologer &&
                        chat.sameAstrologer.length > 0 &&
                        chat.sameAstrologer[chat.sameAstrologer.length - 1]
                          .chatTime}
                      mins
                    </td>
                    <td>
                      &#8377;{" "}
                      {chat &&
                        chat.sameAstrologer &&
                        chat.sameAstrologer.length > 0 &&
                        chat.sameAstrologer[chat.sameAstrologer.length - 1]
                          .spentAmount}
                    </td>
                    <td>
                      <Button variant="success" onClick={()=> navigate(`/full_chat_history/${chat.sameAstrologer[chat.sameAstrologer.length - 1].astrologerId}`)}>
                      View
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </section>
      </main>
    </div>
  );
}

export default ChatHistory;
