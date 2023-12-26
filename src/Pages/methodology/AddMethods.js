import "../../Stylesheets/Addastrologer.scss";
import { FloatingLabel, Form, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function AddMethods() {
  const [category, setCategory] = useState("");

  const [isLoading, setIsloading] = useState(false);
  const { token } = useSelector((state) => state.authState);




  const onSubmit = async (e) => {
    e.preventDefault();
    const methodologyDetails = {
       category:category,
    
      };
      console.log(methodologyDetails );
try{
  const response = await fetch(
    `${process.env.REACT_APP_URL}/api/v1/package/create`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: "POST",
      body:JSON.stringify(methodologyDetails )
    }
  );
  if (response.ok === false) {
    alert(" create package Failed");
  } else {
    alert("Package Created Successful");
  }
}catch(err){
  toast(err, {
    type: 'error',
    position: toast.POSITION.TOP_RIGHT,
  });
}
   
  };
  return (
    <div className="infoContainer">
      <main id="admin-addastro">
        <section className="astro-head">
          <div>
            <h3>Add Methodology</h3>
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
        </section>
        <section className="my-4">
          <Form
            className="reg-form"
            onSubmit={onSubmit}
            encType="multipart/form-data"
          >
            <article className="basicDetails">
              <p style={{ fontSize: "16px", textDecoration: "underline" }}>
                Basic details
              </p>

              <div className="twoCol">
                {/* FirstName */}

                <div className="mb-3">
                  <FloatingLabel controlId="category" label="Astrology">
                    <Form.Control
                      type="text"
                      placeholder="Astrology"
                      name="category"
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </FloatingLabel>
                </div>

                </div>
            </article>
            <div className="twoCol btnGroup">
              <div>
                <button
                  type="submit"
                  id="submitBtn"
                  className="btns"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Spinner animation="grow" className="text-center" />
                  ) : (
                    <>Add</>
                  )}
                </button>
              </div>
            </div>
          </Form>
        </section>
      </main>
    </div>
  );
}

export default AddMethods;
