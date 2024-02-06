import React from 'react'
import { toast } from "react-toastify";
import { logout, userRecharge } from "../action/userAction";
import { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { getPackage } from "../action/packageAction";
import { useDispatch, useSelector } from "react-redux";

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
          <Modal.Body>
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
                      <td>{index + 1}</td>
                      <td>{data?.fixedPrice}</td>
                      <td className="package_name">{data?.packageName}</td>
                      <td>{data?.packageDetail}</td>
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
            <Button onClick={props.onHide} className="modal_btn">Close</Button>
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
          <Modal.Header closeButton  id="pckg_header"> 
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
                        <td className="package_name">{packageData?.packageName}</td>
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
     
            <Button onClick={props.onHide} className="modal_btn">Close</Button>
  
          </Modal.Footer>
        </Modal>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }
  


export default UserRechargeDetailModal
