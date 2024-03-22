import React from "react";
import "./AddPost.css";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { useState } from "react";
import {toast } from "react-toastify";

const AddPost = (props) => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const token = sessionStorage.getItem("token");
 

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

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();
      formdata.append("title", title);
      formdata.append("caption", caption);
      formdata.append("image", image);

      const res = await axios.post(
        `http://localhost:4000/post/new`,
        formdata,
        {
          headers: {
            token: token,
          },
        }
      );

          console.log(res)
      if(res.data.message === "Post Uploaded"){

        toast.success("Post uploaded Sucessfully ")
      }
      else {
        toast.error(res.data.message)
      }
      



    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={
        props.showbox
          ? "user-add-post animate__animated animate__backInDown"
          : "display-none  animate__animated animate__fadeOutDown"
      }
    >
      <IoMdClose
        className="close"
        onClick={() => {
          props.setShowBox(false);
        }}
      />

      <div className="form-container">


        <div className="selected-image">
          <img src={image} alt="kuchBhi" />
        </div>

        <form className="form">
          <label> Choose Image </label>

          <input type="file" name="image" onChange={handleImage} />
          <label> Title</label>
          <input
            placeholder="enter your title"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          <label> Caption</label>
          <input
            placeholder="enter your caption"
            name="caption"
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
          />

          <button onClick={handleUpload}> upload </button>
        </form>


      </div>



    </div>
  );
};

export default AddPost;
