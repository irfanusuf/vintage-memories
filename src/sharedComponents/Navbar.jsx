import React, { useState } from "react";
import "./SharedCss.css";
import {  useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { FaHome, FaSearch } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import AddPost from "../postComponents/AddPost";
import authenticated from "../authorization/auth";


// function based component
const Navbar = (props) => {
 
  const navigate = useNavigate();
  const [showbox, setShowBox] = useState(false);
  
  
  const handleAddpost = () => {
    setShowBox(true);
   
    props.setOpacity(true)
    
  };

  return (
    <>


   { authenticated() &&  <div className="navbar">
      
        <div className="add-post">


          <span>
            <FaHome
              onClick={() => {
                navigate("/postOfFollowing");
              }}
            />
          </span>



          <span>
           <FaPlus onClick={handleAddpost} />
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

      
      </div>}

      <AddPost showbox={showbox} setShowBox={setShowBox} setOpacity = {props.setOpacity}/>
    </>
  );
};

export default Navbar;
