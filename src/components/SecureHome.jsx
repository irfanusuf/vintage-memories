import React from "react";
import "../styles/SecureHome.css";
import AuthenticatedUser from "../authorization/auth";

const SecureHome = () => {


  AuthenticatedUser()     // higher order function 


  return (
    <div className="secure-home">
  
      <p> This is a secure Home Page </p>
    </div>
  );
};

export default SecureHome;
