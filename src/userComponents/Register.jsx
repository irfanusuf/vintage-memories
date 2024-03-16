import React, { useState } from "react";
import "./Register.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import pinstagrammobileimage from "../assets/pinstagrammobileimage.PNG"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer ,toast } from "react-toastify";


const Register = () => {
  // const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  
  const [loading, setLoading] = useState(false)

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

      formDataArr.append("username", username)
      formDataArr.append("email", email)
      formDataArr.append("password", password)
      formDataArr.append("image", image)

      const res = await axios.post(
        "http://localhost:4000/user/register"
        , formDataArr
      );

      if (res.data.message === "user created") {
          toast.success("User Created !")
        // Form Sanitization
        setEmail("")
        setImage(null)
        setPassWord("")
        setUsername("")


      } else {

        toast.error(res.data.message)
       
      }
    } catch (err) {
      toast.error("Network error")
      console.log(err);
    }
    finally {

      setLoading(false)
    }
  };

  return (

    <>
    <ToastContainer position="top-center"/>
    <div className="register">
      <div className="container">
        {/* <h1> Register</h1> */}

        <div className="img">
          <img src={pinstagrammobileimage} alt="pinstagram" />
        </div>

        <div className="form">
          <form>

            <div className="logo">
            </div>

            <img src={image} alt="no-preview" width={100} className="profilepic" />

            <label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                placeholder="+"
                className="addprofilepic"
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
                className="password"
              />
            </label>

            {showPass ? <FaEyeSlash className="passwordeye" onClick={()=>{setShowPass(!showPass)}}/> 
            : <FaEye className="passwordeye" onClick={()=>{setShowPass(!showPass)}}/> }

           

            <button onClick={handleRegister} disabled={loading}> Submit </button>
          </form>

          <div className="login">
            <p className="link">
              Already Registered? <Link to={"./Login"}>Login </Link>
            </p>
          </div>

        </div>

      </div>
    </div>
    </>
  );
};

export default Register;
