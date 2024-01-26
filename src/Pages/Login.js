import loginBG from "../assests/LoginBG.png";
import loginStar from "../assests/a1.jpg";
import "../Stylesheets/Login.css";
import logo from "../assests/logo green.png";
import icons from "../assests/icons.png";
import PhoneInput from "react-phone-input-2";
import { toast } from 'react-toastify'
import "react-phone-input-2/lib/style.css";
import { useEffect, useState } from "react";
import { clearAuthError, login,} from '../action/userAction';
import { useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import MetaData from "./MetaData";


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
import { useNavigate,Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const {loading, error, isAuthenticated} = useSelector(state=>state.authState)


  const dispatch = useDispatch()

  const [showTab, setShowtab] = useState(1);
  const handleClick = (num) => {
    setShowtab(num);
  };


  
  //step-1
  const [phoneNumber, setPhoneNumber] = useState("");
  const [valid, setValid] = useState(false);
  const [alert, setAlert] = useState(false);
  const [disable, setDisable] = useState(false);
  const [setloading, setLoading] = useState(false);
  const handleChange = (value) => {
    setAlert(false);
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (mob) => {
    const removeCountryCode = mob.substr(2);
    const phoneNumberPattern = /^[6-9]\d{9}$/;
    return phoneNumberPattern.test(removeCountryCode);
  };
  let mobile = phoneNumber.replace(/\D/g, "");
  const phoneNo = mobile.slice(2);
  //check the  registered user

 
  const submitHandler = async () => {
    if (loading || disable) {
      return; // Prevent multiple clicks while the login is in progress
    }

    console.log(phoneNo);
     setLoading(true); // Set loading to true when login process starts

    try {
      await dispatch(login(phoneNo));

     

        // Handle OTP logic here
        handleOTP();

        // Disable the button after successful login
        setDisable(true);
      
    } catch (error) {
      // Handle error if needed
      console.error(error);
    } finally {
      setLoading(false); // Reset loading state when login process is complete
    }
  };
  useEffect(()=>{
    if(error){
       toast(error, {
         position:toast.POSITION.TOP_RIGHT,
         type:'error',
         onOpen:()=>{dispatch(clearAuthError);
             navigate('/register');},
      
       })
        return

    }
  },[error, isAuthenticated,dispatch])

  

  // const submitHandler = async () => {
    
  
  //   try {
  //   setDisable(true)
  //     const response = await fetch("https://shy-gold-sawfish-robe.cyclic.app/api/v1/user/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ phoneNo: phoneNo}),
  //     });
    
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       const errorMessage = errorData.message || "Unknown error";
    
  //       if (response.status === 404) {
  //         toast.error("User Not Found. Please register");
  //         navigate("/register");
  //       } else {
  //         toast.error(`Login failed: ${errorMessage}`);
  //       }
  //     } else {
  //       // handleOTP();
  //       navigate('/timer')
  //     }

  //   } catch (error) {
  //     console.error("Error during registration:", error);
  //     toast.error("Login Failed. Please try again.");
  //   }

  // };
  // ...

  function handleOTP() {

    if (valid) {
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
      toast.success("Login Successful");
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

  const validation = {
    username: {
      required: {
        value: true,
        message: "Fill the details",
      },
    },
  };
  return (
    <div id="login">
        <MetaData title={'Astro5Star'} />
      <div className="loginContainer">
        <img src={logo} alt="navLogo" />
        <h2>
          Login
          <div
            style={{
              height: "3px",
              width: "75px",
              backgroundColor: "#229e48",
              borderRadius: "10px",
              marginTop: "8px",
            }}
          ></div>
        </h2>

        <p>
        Welcome Back to Astro 5 Star
        </p>
        <div className={showTab === 1 ? "active" : "disable"}>
          <Form className="mt-4 form">
        
            
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
            <div style={{display:"flex", marginTop:"1rem",alignItems:"center"}}>
            <Button
               onClick={(e) => {
                e.preventDefault();
                submitHandler();
              }}
              className="otpBtn"
              style={{ marginTop: "px" }}
              disabled={setloading || disable} 

            >
              Get OTP
            </Button>
            <p style={{ fontSize: "16px", marginLeft:"1.4rem",marginTop:"15px"}}>
                New User Please?{" "}
                <Link to="/register" style={{ color: "#229e48", marginLeft:"0.2rem"}}>
                  Register
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
            <Button onClick={handleVerify}>Verify</Button>
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
            
          </div>
        </div>
        {/* <div className={showTab === 3 ? "active" : "disable"}>
                    <form onSubmit={handleSubmit((data, e) => {
                        e.preventDefault()
                        navigate('/home')
                        
                    })}>
                        <div className="mb-3 me-3">
                            <label htmlFor="username" className="form-label">Enter Username</label>
                            <input type="text" className="form-control" id="username" placeholder="Username" name="username"   {...register("username", validation.username)} />
                        </div>
                        <Button type="submit" className="otpBtn ">Submit</Button>
                    </form>
                    <p className="errormsg">
                        {errors.username && errors.username.message}
                    </p>
                    <div className="conditions">
                        <h4 style={{ color: "#EE721B" }}>Terms and Conditions</h4>
                        <p>
                            Duis et ligula id felis gravida vulputate. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus lacinia vestibulum gravida. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum lacinia lobortis urna eget mattis. Nullam vestibulum vestibulum neque ac efficitur. Nunc vitae tellus leo. Maecenas condimentum eros metus, id ornare erat porttitor vitae  vestibulum neque ac efficitur. Nunc vitae tellus leo. Maecenas condimentum eros metus, id ornare erat porttitor vitae.
                            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus lacinia vestibulum gravida. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum lacinia lobortis urna eget mattis. Nullam vestibulum vestibulum neque ac efficitur. Nunc vitae tellus leo. Maecenas condimentum eros metus, id ornare erat porttitor vitae  vestibulum neque ac efficitur.
                        </p>
                    </div>
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
