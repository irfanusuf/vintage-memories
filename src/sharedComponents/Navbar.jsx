import React from "react";
import "./SharedCss.css";


// function based component 
const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        <li>Home</li>
        <li>Register</li>
        <li>About</li>
        <li>Login</li>
        <li>Contact Us </li>
      </ul>
    </div>
  );
};

export default Navbar;
