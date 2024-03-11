import React from "react";
import "./SharedCss.css";
import { Link } from "react-router-dom";

// function based component
const Navbar = () => {
  return (
    <div className="navbar">
      <span><Link to="/">Pinstagram</Link> </span>

      <ul>
        <li>
          {" "}
          <Link to="/login"> Login </Link>{" "}
        </li>
        <li>
          {" "}
          <Link to="/register"> Register </Link>{" "}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
