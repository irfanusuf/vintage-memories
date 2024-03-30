import React from "react";
import "./AddPost.css";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../sharedComponents/Loader";


const AddPost = (props) => {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  

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
      setLoading(true);

      const formdata = new FormData();
      formdata.append("title", title);
      formdata.append("caption", caption);
      formdata.append("image", image);

      const res = await axios.post(`http://localhost:4000/post/new`, formdata, {
        headers: {
          token: token,
        },
      });

      if (res.data.message === "Post Uploaded") {
        setLoading(false);
        setTitle("");
        setCaption("");
        props.setShowBox(false);
        props.setOpacity(false);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={
        props.showbox
          ? "user-add-post animate__animated animate__fadeInDown"
          : "display-none  "
      }
    >
      <IoMdClose
        className="close"
        onClick={() => {
          props.setShowBox(false);
          props.setOpacity(false);
        }}
      />

      <div className="form-container">
        <div className="selected-image">
          {loading ? <Loader /> : <img src={image} alt= {image} />}
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

          <button onClick={handleUpload} disabled={loading}>
            {" "}
            upload{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
