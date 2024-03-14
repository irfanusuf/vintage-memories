import React, { useState } from "react";
import "./Login.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import pinstagrammobileimage from "../assets/pinstagrammobileimage.PNG"
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState("");

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
      const res = await axios.post(
        "http://localhost:4000/user/login",
        formData
      );

      if (res.data.message === "Logged In") {
        // const token = res.data.token
        // const userId = res.data.userId

        const { token, userId } = res.data

        await sessionStorage.setItem('token', token)
        await sessionStorage.setItem('userId', userId)

        setMessage("Logged in  SuccesFully!");
        // Form Sanitization
        setFormData({
          username: "",
          password: "",
        });


        navigate("/");

      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage("Network Error ");
      console.log(err);
    }
  };

  return (
    <div className="login">
      <div className="container">

        <div className="img">
          <img src={pinstagrammobileimage} alt="pinstagram" />
        </div>

        {/* <h1> Login </h1> */}

        <div className="form">


          <form>
            <div className="logo">
            </div>

            <label>
              Username
              <input
                type="text"
                name="username" //key
                placeholder="Enter your Username here "
                value={formData.username}
                onChange={handleChange}
              />
            </label>

            <label>
              PassWord
              <input
                type={showPass ? "text" : "password"}
                name="password" //key
                placeholder="Enter your Pass here "
                value={formData.password}
                onChange={handleChange}
                className="password"
              />
            </label>

            {showPass ? <FaEyeSlash className="passwordeye" onClick={() => { setShowPass(!showPass) }} /> : <FaEye className="passwordeye" onClick={() => { setShowPass(!showPass) }} />}

            <p> {message} </p>

            <button onClick={handleLogin}> Log In </button>

          </form>

          <div className="signup">
            <p className="link">Don't Have an Account? <Link to={"./Register"}>Sign Up</Link></p>
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default Register;
