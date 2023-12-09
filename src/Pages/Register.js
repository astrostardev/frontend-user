import loginBG from "../assests/LoginBG.png";
import loginStar from "../assests/astrostar.png";
import "../Stylesheets/Login.css";
import logo from "../assests/aq1.png";
import icons from "../assests/icons.png";
import PhoneInput from "react-phone-input-2";
import { toast } from 'react-toastify'
import "react-phone-input-2/lib/style.css";
import { useEffect, useReducer, useState } from "react";

import {userRegister} from '../action/userAction';


import {
  Form,
  Button,
  Toast,
  Alert,
  ToastContainer,
  FloatingLabel,
  InputGroup,
} from "react-bootstrap";
import OtpInput from "react-otp-input";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [userDetail, setUserDetail] = useState("");
  const [showTab, setShowtab] = useState(1);
  const handleClick = (num) => {
    setShowtab(num);
  };

  //step-1
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setUserName] = useState("");
  const [namealert, setNameAlert] = useState(false);

  const [valid, setValid] = useState(false);
  const [alert, setAlert] = useState(false);
  const[check,setCheck]=useState(false)
  const [checkAlert, setCheckAlert] = useState(false);
  const [disable, setDisable] = useState(false);

  const handleChange = (value) => {
    setAlert(false);
    setCheckAlert(false);
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  

  };

  let mobile = phoneNumber.replace(/\D/g, "");
  const phoneNo = mobile.slice(2);

  const validatePhoneNumber = (mob) => {
    const removeCountryCode = mob.substr(2);
    const phoneNumberPattern = /^[6-9]\d{9}$/;
    return phoneNumberPattern.test(removeCountryCode);
  };
  const validation = {
    username: {
      required: {
        value: true,
        message: "Fill the details",
      },
    },
  };
 


   
  const checkUser =  () => {
    // e.preventDefault();
    if (!phoneNo || !name || check === false) {
      toast.error("Please fill all the fields and check the box", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    setDisable(true)
    
dispatch(userRegister(phoneNo,name))
handleOTP()
  };
  

  function handleOTP() {
    if (valid) {
      setDisable(!disable);
      setSeconds(45);
      setMinutes(0);
      setAlert(false);
      handleClick(2);
    } else {
      setAlert(true);
    }
  }

  //step-2
  function handleBack() {
    handleClick(1);
  }

  const [otp, setOtp] = useState("");
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [otpAlert, setOtpalert] = useState(false);

  useEffect(() => {
    const interval = setInterval(function () {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const resendOTP = () => {
    setMinutes(1);
    setSeconds(30);
  };

  function handleVerify() {
    if (otp == "123456") {
      setDisable(!disable);
      setOtpalert(false);
      toast.success("Registration Successful");
      navigate("/home");
    } else {
      setOtpalert(true);
    }
  }

  //step-3
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <div id="login">
      <div className="loginContainer">
        <img src={logo} alt="navLogo" />
        <h2>
          Register{" "}
          <div
            style={{
              height: "3px",
              width: "75px",
              backgroundColor: "#FFCB11",
              borderRadius: "10px",
              marginTop: "8px",
            }}
          ></div>
        </h2>

        <div className={showTab === 1 ? "active" : "disable"}>
          <Form className="mt-4" id="form">
            <div className="register_feild">
              <Form.Group controlId="formFile" className="mb-3 me-3">
                <Form.Label>Enter your mobile number:</Form.Label>
                <PhoneInput
                  country={"in"}
                  value={phoneNumber}
                  onChange={handleChange}
                  inputProps={{
                    name: "mobile",
                    required: true,
                  }}
                  countryCodeEditable={false}
                  onlyCountries={["in"]}
                  disableDropdown={true}
                />
              </Form.Group>
              <div className="mb-3 me-3">
                <label htmlFor="username" className="form-label">
                  Enter Your Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Username"
                  name="username"
                  onChange={(e) => setUserName(e.target.value)}
                  value={name}
                  required
                  //  {...register("username", validation.username)}
                />
              </div>
            </div>
            {namealert && (
              <ToastContainer
                position="top-end"
                className="p-3"
                style={{ zIndex: 1 }}
              >
                <Toast
                  className="d-inline-block m-1"
                  bg="danger"
                  delay={3000}
                  autohide={true}
                >
                  <Toast.Body className="dark">Please enter name</Toast.Body>
                </Toast>
              </ToastContainer>
            )}
            <div
              className="conditions"
              style={{ marginBottom: "1rem", marginTop: "0.5rem" }}
            >
              <h4 style={{ color: "#EE721B" }}>Terms and Conditions</h4>
              <p>
                Duis et ligula id felis gravida vulputate. Class aptent taciti
                sociosqu ad litora torquent per conubia nostra, per inceptos
                himenaeos. Phasellus lacinia vestibulum gravida. Interdum et
                malesuada fames ac ante ipsum primis in faucibus. Vestibulum
                lacinia lobortis urna eget mattis. Nullam vestibulum vestibulum
                neque ac efficitur. Nunc vitae tellus leo. Maecenas condimentum
                eros metus, id ornare erat porttitor vitae vestibulum neque ac
                efficitur. Nunc vitae tellus leo. Maecenas condimentum eros
                metus, id ornare erat porttitor vitae. Class aptent taciti
                sociosqu ad litora torquent per conubia nostra, per inceptos
                himenaeos. Phasellus lacinia vestibulum gravida. Interdum et
                malesuada fames ac ante ipsum primis in faucibus. Vestibulum
                lacinia lobortis urna eget mattis. Nullam vestibulum vestibulum
                neque ac efficitur. Nunc vitae tellus leo. Maecenas condimentum
                eros metus, id ornare erat porttitor vitae vestibulum neque ac
                efficitur.
              </p>
            </div>
            <p className="terms">
              <input
                type="checkbox"
                required
                onChange={(e)=>setCheck(e.target.value)}
                style={{ marginLeft: "3px", marginRight: "10px" }}
              />
              By signing up, you agree to our <a href="#">Terms of use</a> and{" "}
              <a href="#">Privacy policy</a>
            </p>{" "}
            <br />
            {checkAlert && (
              <ToastContainer
                position="top-end"
                className="p-3"
                style={{ zIndex: 1 }}
              >
                <Toast
                  className="d-inline-block m-1"
                  bg="danger"
                  delay={3000}
                  autohide={true}
                >
                  <Toast.Body className="dark">Please Check the box</Toast.Body>
                </Toast>
              </ToastContainer>
            )}
            <div  className="register-feild">
              <Button
                type="submit"
                onClick={ (e) => {
                  e.preventDefault();
                  checkUser();
                }}
                disabled={disable}
                className="otpBtn"
              >
                Get OTP
              </Button>
              <p style={{ fontSize: "16px", marginLeft:"1rem", marginTop:"1rem"}}>
                Already Registered?{" "}
                <Link to="/login" style={{ color: "#FFCB11", marginLeft:"0.2rem"}}>
                  Login
                </Link>
              </p>
            </div>
          </Form>
          {alert && (
            <ToastContainer
              position="top-end"
              className="p-3"
              style={{ zIndex: 1 }}
            >
              <Toast
                className="d-inline-block m-1"
                bg="danger"
                delay={3000}
                autohide={true}
              >
                <Toast.Body className="dark">
                  Enter valid mobile number
                </Toast.Body>
              </Toast>
            </ToastContainer>
          )}
        </div>
        <div className={showTab === 2 ? "active" : "disable"}>
          <Form className="mt-4" id="form">
            <Form.Group controlId="formFile" className="mb-3 me-3">
              <Form.Label>Enter your mobile number:</Form.Label>
              <PhoneInput
                country={"in"}
                value={phoneNumber}
                onChange={handleChange}
                inputProps={{
                  required: true,
                }}
                countryCodeEditable={false}
                onlyCountries={["in"]}
                disableDropdown={true}
                disabled={true}
              />
            </Form.Group>
            <Button onClick={handleBack} className="otpBtn">
              Edit
            </Button>
          </Form>

          {/* OTP input */}
          <div className="inputOtp mt-4">
            <p className="fs-6 mb-2">
              You will receive 6 digits code for verification
            </p>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="me-2"></span>}
              renderInput={(props) => <input {...props} className="otpBox" />}
            />
            <div className="countdown-text">
              {seconds > 0 || minutes > 0 ? (
                <p>
                  Time remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </p>
              ) : (
                <p> Didn't receive the OTP </p>
              )}
              <button
                disabled={seconds > 0 || minutes > 0}
                style={{
                  color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
                }}
                onClick={resendOTP}
              >
                Resend OTP
              </button>
            </div>
            <Button onClick={handleVerify} disabled={!disable}>
              Verify
            </Button>
            {otpAlert && (
              <ToastContainer
                position="top-end"
                className="p-3"
                style={{ zIndex: 1 }}
              >
                <Toast
                  className="d-inline-block m-1"
                  bg="danger"
                  delay={3000}
                  autohide={true}
                >
                  <Toast.Body className="dark">Invalid OTP</Toast.Body>
                </Toast>
              </ToastContainer>
            )}
            <p className="terms">
              By signing up, you agree to our <a href="#">Terms of use</a> and{" "}
              <a href="#">Privacy policy</a>
            </p>
          </div>
        </div>
        {/* <div className={showTab === 3 ? "active" : "disable"}>
          <form
            onSubmit={handleSubmit((data, e) => {
              e.preventDefault();
              navigate("/home");
            })}
          >
         
            <Button type="submit" className="otpBtn ">
              Submit
            </Button>
          </form>
          <p className="errormsg">
            {errors.username && errors.username.message}
          </p>
    
        </div> */}
      </div>

      <div id="logoImg" className="loginImgContainer">
        <img src={icons} alt="icons" className="iocns" />
        <img src={loginStar} alt="star" className="logoStar" />
      </div>
    </div>
  );
}

export default Login;
