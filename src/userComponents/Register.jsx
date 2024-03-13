import React, { useState } from "react";
import "./Register.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [message, setMessage] = useState("");
  const [loading , setLoading] =useState(false)

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0]; // incoming selected file ....first one
    const reader = new FileReader(); // creating an instance of file reader
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
  };



  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        setLoading(true)
      const formDataArr = new FormData()
      formDataArr.append("username" , username)
      formDataArr.append("email" , email)
      formDataArr.append("password" ,password)
      formDataArr.append("image" , image)

      const res = await axios.post(
        "http://localhost:4000/user/register"
        , formDataArr
      );

      if (res.data.message === "user created") {
        setMessage("User created SuccesFully!");
        // Form Sanitization
        setEmail("")
        setImage(null)
        setPassWord("")
        setUsername("")

   
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage("Network Error ");
      console.log(err);
    }
    finally{

      setLoading(false)
    }
  };

  return (
    <div className="register">
      <div className="container">
        <h1> Register</h1>

        <form>
          <img src={image} alt="no-preview" width={100} />

          <label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              placeholder="select image "
            />
          </label>

          <label>
            Username
            <input
              type="text"
              name="username" //key
              placeholder="Enter your Username here "
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </label>

          <br />

          <label>
            Email
            <input
              type="email"
              name="email" //key
              placeholder="Enter your Email here "
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <br />

          <label>
            PassWord
            <input
              type={showPass ? "text" : "password"}
              name="password" //key
              placeholder="Enter your Pass here "
              value={password}
              onChange={(e) => {
                setPassWord(e.target.value);
              }}
            />
          </label>
          <p style={{color:"white"}}> {message} </p>

          <p className="link">
            Already Registered? <Link to={"./Login"}>Login Here</Link>
          </p>
          <button onClick={handleRegister} disabled={loading}> Submit </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
