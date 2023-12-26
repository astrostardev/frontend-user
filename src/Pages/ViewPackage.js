import React, { useState, useEffect } from "react";
import "../Stylesheets/ViewProfile.scss";
import astrologer from "../Assests/astrologer.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap"
import dayjs from 'dayjs';
import moment from "moment"
import { useSelector } from "react-redux";

function ViewPackage() {
    const [isLoading, setIsloading] = useState(false)
    const [packages, setPackages] = useState(null)
    const navigate = useNavigate()
    const { id } = useParams()
    const {token} = useSelector(state=>state.authState)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsloading(true)
                const response = await fetch(`${process.env.REACT_APP_URL}/api/v1/package/getPackage/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    // Handle non-successful response (e.g., 404 Not Found)
                    alert(`Error: ${response.status} - ${response.statusText}`);
                    return;
                } else {
                    setIsloading(false)
                    const data = await response.json();
                    // console.log(data);
                    setPackages(data.package)
                   console.log(packages);
                }

            } catch (error) {
                alert('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="infoContainer">
            {isLoading ?
                <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <Spinner animation="grow" className="text-center" variant="warning" />
                </div>
                :
                <main className="card profile_container">
                    <section className="viewProfile-head">
                        <div>
                            <h3>Package</h3>
                            <div
                                style={{
                                    height: "3px",
                                    width: "40px",
                                    backgroundColor: "#0042ae",
                                    borderRadius: "10px",
                                    marginTop: "3px",
                                }}
                            ></div>
                        </div>
                        {/* <div className="btnGroup">
                            <button className="btns" onClick={() => navigate(`/edituser/${users?.user?._id}`)} disabled={isLoading}>Edit</button>
                            <Button variant="danger" onClick={handleDelete} >Delete</Button>
                        </div> */}
                    </section>
                    <h3 style={{ textDecoration: "underline", marginBottom: "20px", marginTop: "20px" }}>
                        Basic Details
                    </h3>

                    <article className="profile_detail">
                     
                    
                        <div className="my-4">
                            <h5>Price</h5>
                            <p>{packages?.fixedPrice}</p>
                        </div>

                        <div className="my-4">
                            <h5>Package Name</h5>
                            <p>{packages?.packageName}</p>
                        </div>
                        <div className="my-4">
                            <h5>Package Detail</h5>
                            <p>{packages?.packageDetail}</p>
                        </div>
                        <div className="my-4" >
                            <h5>Status </h5>
                           <p><input type="checkbox" checked={packages?.isActive ? true : false} /></p> 
                        </div>
                    
                    </article>

                    <div className="btnGroup">
                        <button className="btns" onClick={() => navigate(`/editpackage/${packages?._id}`)} disabled={isLoading}>Edit</button>
                        {/* <Button variant="danger" onClick={handleDelete} >Delete</Button> */}
                    </div>
                </main>
            }
        </div>
    );
}

export default ViewPackage;