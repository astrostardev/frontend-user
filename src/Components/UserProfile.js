import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../Stylesheets/UserProfile.css";
import Sidebar from "./Sidebar";
import OffCanvasNav from "./OffCanvasNav";
function UserProfile(props) {
  const [disable, setDisabled] = useState(true);

  function editData() {
    setDisabled(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setDisabled(true);
  }
  return (
    <>
      <div id="fixedbar">
        <Sidebar />
      </div>
      <div id="offcanvas">
        <OffCanvasNav />
      </div>
      <div id="profile_container">
        <h4>Your Profile</h4>
        <div
          style={{
            height: "3px",
            width: "50px",
            backgroundColor: "#EE721B",
            borderRadius: "10px",
            marginTop: "3px",
          }}
        ></div>
        <main>
          <section id="astroProfile">
            <Form className="astroForm">
              <div className="my-4">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Username"
                  className="mb-3"
                  style={{ width: "100%" }}
                >
                  <Form.Control
                    type="text"
                    placeholder="username"
                    defaultValue=""
                    name="username"
                    disabled={disable}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Your DOB"
                  className="mb-3"
                  style={{ width: "100%" }}
                >
                  <Form.Control
                    type="text"
                    placeholder="date of birth"
                    defaultValue=""
                    name="dob"
                    disabled={disable}
                  />
                </FloatingLabel>
              </div>
              <div className="my-4">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email"
                  className="mb-3"
                  style={{ width: "100%" }}
                >
                  <Form.Control
                    type="email"
                    placeholder="email"
                    name="email"
                    defaultValue="raghavswami@gmail.com"
                    disabled={disable}
                  />
                </FloatingLabel>
                <Form.Label>
                  Mobile number
                  <Form.Control
                    plaintext
                    readOnly
                    defaultValue="+919876543210"
                  />
                </Form.Label>
              </div>
              <div className="my-4">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Place Of Birth"
                  className="mb-3"
                  style={{ width: "100%" }}
                >
                  <Form.Control
                    type="text"
                    placeholder="place of birth"
                    defaultValue=""
                    name="place of birth"
                    disabled={disable}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Postal Code"
                  className="mb-3"
                  style={{ width: "100%" }}
                >
                  <Form.Control
                    type="text"
                    placeholder="postal code"
                    defaultValue=""
                    name="postal code"
                    disabled={disable}
                  />
                </FloatingLabel>
              </div>
              <div className="my-4" id="user_place">
                <FloatingLabel
                  controlId="floatingInput"
                  label="City"
                  className="mb-3"
                  style={{ width: "100%" }}
                >
                  <Form.Control
                    type="text"
                    placeholder="city"
                    defaultValue=""
                    name="city"
                    disabled={disable}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="State"
                  className="mb-3"
                  style={{ width: "100%" }}
                >
                  <Form.Control
                    type="text"
                    placeholder="state"
                    defaultValue=""
                    name="state"
                    disabled={disable}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Country"
                  className="mb-3"
                  style={{ width: "100%" }}
                >
                  <Form.Control
                    type="text"
                    placeholder="country"
                    defaultValue=""
                    name="country"
                    disabled={disable}
                  />
                </FloatingLabel>
              </div>
              <div className="my-4" id="user_address">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Address"
                  className="mb-3"
                  style={{ width: "100%" }}
                >
                  <Form.Control
                    type="text"
                    placeholder="address"
                    defaultValue=""
                    name="address"
                    disabled={disable}
                  />
                </FloatingLabel>
              </div>
              <div className="my-4">
                <div className="ms-2" >
                  <Form.Label className="me-3">
                    Select Gender
                  </Form.Label>
                  <div id="slct_gender">
                  <Form.Check
                    type="radio"
                    label="Male"
                    name="gender"
                    inline
                    id="inline-radio-1"
                    defaultChecked
                    disabled={disable}
                  />
                  <Form.Check
                    type="radio"
                    label="Female"
                    name="gender"
                    inline
                    id="inline-radio-2"
                    disabled={disable}
                  />
                  <Form.Check
                    type="radio"
                    label="Others"
                    name="gender"
                    inline
                    id="inline-radio-3"
                    disabled={disable}
                  />
                  </div>
                </div>
              </div>
              {/* <FloatingLabel controlId="floatingTextarea2" label="Bio">
                              <Form.Control
                                  as="textarea"
                                  placeholder="Bio"
                                  defaultValue="Vedic Astrologer"
                                  style={{ height: '100px' }}
                                  disabled={disable}
                              />
                          </FloatingLabel> */}
              <article className="my-3 profileBtn">
                <Button variant="warning" className="me-3" onClick={editData}>
                  Edit
                </Button>
                <Button
                  type="submit"
                  style={{ backgroundColor: "#EE721B", border: "transparent" }}
                  onClick={(e) => handleSubmit(e)}
                >
                  Submit
                </Button>
              </article>
            </Form>
          </section>
        </main>
      </div>
    </>
  );
}

export default UserProfile;
