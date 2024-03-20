import React from "react";
import "./AddPost.css";
import { IoMdClose } from "react-icons/io";

const AddPost = (props) => {
  return (
    <div
      className={
        props.showbox
          ? "user-add-post animate__animated animate__backInDown"
          : "user-add-post animate__animated animate__fadeOutDown"
      }
    >
      <IoMdClose
        style={{ fontSize: "40px" }}
        onClick={() => {
          props.setShowBox(false);
        }}
      />



      <form className="form">
        <label> Choose Image </label>

        <input
        type="file"/>
        <label> Title</label>
        <input 
        placeholder="enter your title"/>
        <label> Caption</label>
        <input
        placeholder="enter your caption"/>

        <button> upload </button>
        
      </form>



    </div>
  );
};

export default AddPost;
