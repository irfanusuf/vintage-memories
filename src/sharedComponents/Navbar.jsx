import React, { useState } from "react";
import "./SharedCss.css";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { FaHome, FaSearch } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import AddPost from "../postComponents/AddPost";
import { ToastContainer } from "react-toastify";


// function based component
const Navbar = () => {
  const navigate = useNavigate();
  const [showbox, setShowBox] = useState(false);

  const handleAddpost = () => {
    setShowBox(true);
  };

  return (
    <>

    <ToastContainer/>
      <div className="navbar">
        <span>
          <Link to="/">Polaroid Memories</Link>{" "}
        </span>

        <div className="add-post">
          <span>
            <FaHome
              onClick={() => {
                navigate("/");
              }}
            />
          </span>
          <span>
            <Link onClick={handleAddpost}>
              <FaPlus />
            </Link>
          </span>
          <span
            onClick={() => {
              navigate("/explore");
            }}
          >
            <FaSearch />
          </span>
          <span>
            <TiMessages />
          </span>
        </div>

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

      <AddPost showbox={showbox} setShowBox={setShowBox} />
    </>
  );
};

export default Navbar;
