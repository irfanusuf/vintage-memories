import React from "react";
import "./SharedCss.css";
import { Link } from "react-router-dom";


// function based component 
const Navbar = () => {
  return (
    <div className="navbar">
      <ul>
        {/* <li>   <a href="/about"> HOme</a> </li> */}
        <li>   <Link to="/">   Home </Link> </li>
        <li>   <Link to="/login">   Login </Link> </li>
        <li>   <Link to="/register">   Register </Link> </li>
        <li>   <Link to="/about">   About </Link> </li>
        <li>   <Link to="/posts"> Posts </Link> </li>
      
      </ul>
    </div>
  );
};

export default Navbar;
