import React, { useState } from "react";
import "./Login.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import pinstagrammobileimage from "../assets/pinstagrammobileimage.PNG";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { baseUrl } from "../config/config";

const Register = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/user/login`, formData);

      if (res.data.message === "Logged In") {
        // const token = res.data.token
        // const userId = res.data.userId
        const { token, userId } = res.data;
        // toast.success("Logged In Sucessfully")

        await sessionStorage.setItem("token", token);
        await sessionStorage.setItem("userId", userId);

        // Form Sanitization
        setFormData({
          username: "",
          password: "",
        });

        navigate("/explore");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Network Error ");
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />

      <div className="login">
        <div className="container">


        <div className="img">
            <img src={pinstagrammobileimage} alt="pinstagram" />
          </div>
          
          <div className="form">
            <form>
              <div className="logo">
           
                {/* <h1> Polaroid mems </h1> */}
              </div>

              <label>
                Username
                <div className="input"> 
                   <input
                  type="text"
                  name="username" //key
                  placeholder="Enter your Username here "
                  value={formData.username}
                  onChange={handleChange}
                />
                </div>
               
              </label>

              <label>
                PassWord

                <div className="input"> 
                  <input
                  type={showPass ? "text" : "password"}
                  name="password" //key
                  placeholder="Enter your Pass here "
                  value={formData.password}
                  onChange={handleChange}
                />
                {showPass ? (
                  <FaEyeSlash
                    className="passwordeye"
                    onClick={() => {
                      setShowPass(!showPass);
                    }}
                  />
                ) : (
                  <FaEye
                    className="passwordeye"
                    onClick={() => {
                      setShowPass(!showPass);
                    }}
                  />
                )}
                </div>
              
              </label>

              <button onClick={handleLogin}> Log In </button>
            </form>

            <div className="signup">
              <p className="link">
                Don't Have an Account? <Link to={"./Register"}>Sign Up</Link>
              </p>
            </div>
          </div>

         
        </div>
      </div>
    </>
  );
};

export default Register;
