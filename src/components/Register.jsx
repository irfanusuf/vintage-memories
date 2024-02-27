import React, { useState } from "react";
import "../styles/Register.css";
import axios from "axios";

const Register = () => {
  const [showPass, setShowPass] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });


  const [message , setMessage] = useState("")

  // const handleEye = ()=>{
  //   setShowPass(!showPass)

  // }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const giveMePromise = await axios.post(
        "http://localhost:4000/user/register",
        formData
      );
    


      


      console.log(giveMePromise)




    } catch (err) {
      setMessage("Network Error ")
      console.log(err);
    }
  };

  return (
    <div className="register-light">
      <div className="container">
        <h1> Register</h1>

        <form >
          <label>
            Username
            <input
              type="text"
              placeholder="Enter your Username here "
              value={formData.username}
              onChange={(e) => {
                setFormData(e.target.value);
              }}
            />
          </label>

          <br />

          <label>
            Email
            <input
              type="email"
              placeholder="Enter your email here "
              value={formData.email}
              onChange={(e) => {
                setFormData(e.target.value);
              }}
            />
          </label>
          <br />

          <label>
            PassWord
            <input
              type={showPass ? "text" : "password"}
              placeholder="Enter your Pass here "
              value={formData.password}
              onChange={(e) => {
                setFormData(e.target.value);
              }}
            />
          </label>
<p> {message}   </p>
          <button onClick={handleRegister}> Submit </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
