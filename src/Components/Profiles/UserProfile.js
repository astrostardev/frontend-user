import React, { useState, useEffect } from "react";
import { FloatingLabel, Form, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "../../Stylesheets/UserProfile.css";
import Sidebar from "../../Pages/Sidebar";
import OffCanvasNav from "../../Pages/OffCanvasNav";
import MetaData from "../../Pages/MetaData";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function UserProfile(props) {
  const [disable, setDisabled] = useState(true);
  const { user } = useSelector((state) => state.authState);
  const [isLoading, setIsloading] = useState(true);
  const { token } = useSelector((state) => state.authState);
  const [userProfile, setUserProfile] = useState({
    name: "",
    dob: "",
    email: "",
    placeOfbirth: "",
    postalCode: "",
    country: "",
    city: "",
    state: "",
    address: "",
    gender: "",
    timeOfbirth: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    dob: "",
    email: "",
    placeOfbirth: "",
    postalCode: "",
    country: "",
    city: "",
    state: "",
    address: "",
    gender: "",
    timeOfbirth: "",
  });

  function editData() {
    setDisabled(false);
  }
  //checking valid Time format
  const isValidTimeFormat = (input) => {
    const timeRegex = /^(0[0-9]|1[0-2]):[0-5][0-9] (am|pm)$/i;
    return timeRegex.test(input);
  };
  const isValidDateFormat = (input) => {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d{2}$/;
    return dateRegex.test(input);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation logic
    let error = "";
    if (name === "name" && value.length === 0) {
      error = "name is required";
    } else if (name === "gender" && !value) {
      error = "Please select a gender";
    } else if (
      name === "email" &&
      !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(value)
    ) {
      error = "Invalid email address";
    } else if (name === "dob" && !isValidDateFormat(value)) {
      error = "Invalid Date of birth";
    } else if (name === "placeOfbirth" && !value) {
      error = "Place of birth reuired";
    } else if (name === "timeOfbirth" && !isValidTimeFormat(value)) {
      error = " Invalid Time of birth";
    }

    setErrors({
      ...errors,
      [name]: error,
    });
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };
  // get single user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/api/v1/user/getuser/${user?._id}`,
          {
            headers: {
              "Content-type": "multipart/form-data",
            },
            method: "GET",
          }
        );

        if (!response.ok) {
          console.error(`Error: ${response.status} - ${response.statusText}`);
          return;
        }

        const data = await response.json();
        console.log(data);
        setUserProfile(data?.user);
        console.log("astro", user);
        setIsloading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    const userDetail = {
      name: userProfile.name,
      dob: userProfile.dob,
      placeOfbirth: userProfile.placeOfbirth,
      email: userProfile.email,
      city: userProfile.city,
      country: userProfile.country,
      postalCode: userProfile.postalCode,
      state: userProfile.state,
      gender: userProfile.gender,
      address: userProfile.address,
      timeOfbirth: userProfile.timeOfbirth,
    };
    console.log("DataOfUser", userDetail);

    try {
      console.log("userdetails", userDetail);
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/v1/user/create/${user?._id}`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userDetail),
        }
      );

      console.log(response);
      if (response.ok === false) {
        toast("Updated failed", {
          position: toast.POSITION.TOP_RIGHT,
          type: "error",
        });

        setIsloading(false);
      } else {
        toast("Updated successfully", {
          position: toast.POSITION.TOP_RIGHT,
          type: "success",
        });
      }
    } catch (error) {
      console.error("Error during course update:", error);

      // Check if the error object has a response or data property
      const errorMessage =
        error.response?.data?.message || "Fill all the fields";

      toast(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
        type: "error",
      });
    }
  };

  return (
    <>
      <MetaData title={"Astro5Star-Profile"} />
      <div id="fixedbar">
        <Sidebar />
      </div>
      <div id="offcanvas">
        <OffCanvasNav />
      </div>
      <div id="profile_container">
        <h4>Your Profile</h4>
        <div className="header_dec"></div>
        <main>
          <section id="astroProfile">
            <Form className="astroForm" onSubmit={onSubmit}>
              <div className="my-2">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Name"
                  className="mb-3"
                  style={{ width: "100%" }}
                >
                  <Form.Control
                    type="text"
                    placeholder="name"
                    name="name"
                    disabled={disable}
                    value={userProfile?.name}
                    onChange={(e) =>
                      setUserProfile({ ...userProfile, name: e.target.value })
                    }
                  />
                  {errors.name && <p className="errormsg">{errors.name}</p>}
                </FloatingLabel>

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
                    disabled={disable}
                    onChange={handleChange}
                    value={userProfile?.email}
                  />
                  {errors.email && <p className="errormsg">{errors.email}</p>}
                </FloatingLabel>

                <Form.Label>
                  Mobile number
                  <Form.Control plaintext readOnly value={user?.phoneNo} />
                </Form.Label>
              </div>

              <div className="my-4">
                <div className="ms-2">
                  <Form.Label className="me-3">Select Gender</Form.Label>
                  <div id="slct_gender">
                    <Form.Check
                      type="radio"
                      label="Male"
                      name="gender"
                      inline
                      id="inline-radio-1"
                      value="male"
                      disabled={disable}
                      checked={userProfile?.gender === "male"}
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      label="Female"
                      name="gender"
                      inline
                      id="inline-radio-2"
                      value="female"
                      disabled={disable}
                      checked={userProfile?.gender === "female"}
                      onChange={handleChange}
                    />
                    <Form.Check
                      type="radio"
                      label="Others"
                      name="gender"
                      inline
                      id="inline-radio-3"
                      value="other"
                      disabled={disable}
                      checked={userProfile?.gender === "other"}
                      onChange={handleChange}
                    />
                    {errors.gender && (
                      <p className="errormsg">{errors.gender}</p>
                    )}
                  </div>
                </div>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Postal Code"
                  className="mb-3"
                  style={{ width: "100%" }}
                >
                  <Form.Control
                    type="text"
                    placeholder="postal code"
                    name="postalCode"
                    disabled={disable}
                    value={userProfile?.postalCode}
                    onChange={handleChange}
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
                    name="city"
                    disabled={disable}
                    value={userProfile?.city}
                    onChange={handleChange}
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
                    name="state"
                    disabled={disable}
                    value={userProfile?.state}
                    onChange={handleChange}
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
                    name="country"
                    disabled={disable}
                    value={userProfile?.country}
                    onChange={handleChange}
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
                    name="address"
                    disabled={disable}
                    value={userProfile?.address}
                    onChange={handleChange}
                  />
                </FloatingLabel>
              </div>
              <hr />
              <p style={{ textDecoration: "underline" }}>Horoscope Detail</p>

              <div className="my-4">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Your DOB"
                  className="mb-3"
                  style={{ width: "100%" }}
                >
                  <Form.Control
                    type="text"
                    placeholder="date of birth"
                    // defaultValue=""
                    name="dob"
                    disabled={disable}
                    value={userProfile?.dob}
                    onChange={handleChange}
                  />
                  {errors.dob && <p className="errormsg">{errors.dob}</p>}
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Time Of Birth"
                  className="mb-3"
                  style={{ width: "100%" }}
                >
                  <Form.Control
                    type="text"
                    placeholder="time of birth"
                    name="timeOfbirth"
                    disabled={disable}
                    value={userProfile?.timeOfbirth}
                    onChange={handleChange}
                  />
                  {errors.timeOfbirth && (
                    <p className="errormsg">{errors.timeOfbirth}</p>
                  )}
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Place Of Birth"
                  className="mb-3"
                  style={{ width: "100%" }}
                >
                  <Form.Control
                    type="text"
                    placeholder="place of birth"
                    name="placeOfbirth"
                    disabled={disable}
                    value={userProfile?.placeOfbirth}
                    onChange={handleChange}
                  />
                  {errors.placeOfbirth && (
                    <p className="errormsg">{errors.placeOfbirth}</p>
                  )}
                </FloatingLabel>
              </div>

              <article className="my-3 profileBtn">
                <Button variant="warning" className="me-3" onClick={editData}>
                  Edit
                </Button>
                <Button type="submit">Submit</Button>
              </article>
            </Form>
          </section>
        </main>
      </div>
    </>
  );
}

export default UserProfile;
