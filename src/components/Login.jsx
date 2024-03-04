import React, { useState } from "react";
import "../styles/Register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      const giveMePromise = await axios.post(
        "http://localhost:4000/user/login",
        formData
      );

      if (giveMePromise.data.message === "Logged In") {
        const token = giveMePromise.data.token

        await sessionStorage.setItem('token' , token )
        setMessage("Logged in  SuccesFully!");
        // Form Sanitization
        setFormData({
          username: "",
          password: "",
        });

    
        navigate("/posts");
      } else {
        setMessage(giveMePromise.data.message);
      }
    } catch (err) {
      setMessage("Network Error ");
      console.log(err);
    }
  };

  return (
    <div className="register-light">
      <div className="container">
        <h1> Login </h1>

        <form>
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

          <br />

        

          <label>
            PassWord
            <input
              type={showPass ? "text" : "password"}
              name="password" //key
              placeholder="Enter your Pass here "
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <p> {message} </p>
          <button onClick={handleLogin}> Login </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
