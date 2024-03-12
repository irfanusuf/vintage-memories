import React, { useState } from "react";
import "./Register.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const giveMePromise = await axios.post(
        "http://localhost:4000/user/register",
        formData
      );

      if (giveMePromise.data.message === "user created") {
        setMessage("User created SuccesFully!");
        // Form Sanitization
        setFormData({
          username: "",
          email: "",
          password: "",
        });
        navigate("/login");
      } else {
        setMessage(giveMePromise.data.message);
      }
    } catch (err) {
      setMessage("Network Error ");
      console.log(err);
    }
  };

  return (
    <div className="register">
      <div className="container">
        <h1> Register</h1>

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
            Email
            <input
              type="email"
              name="email" //key
              placeholder="Enter your Email here "
              value={formData.email}
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
          <p className="link">Already Registered? <Link to={"./Login"}>Login Here</Link></p>
          <button onClick={handleRegister}> Submit </button>

        </form>
      </div>
    </div>
  );
};

export default Register;
