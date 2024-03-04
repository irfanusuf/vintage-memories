import React, { useEffect, useState } from "react";
import "../styles/posts/GetAllPosts.css";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { LuMessageCircle } from "react-icons/lu";
import { FaShare } from "react-icons/fa";
import CommentBox from "./CommentBox";
import AuthenticatedUser from "../authorization/auth";

const GetAllPosts = () => {


  AuthenticatedUser()

  const [data, setData] = useState([]);
  const [heart, setHeart] = useState(false);
  const [comment, setComment] = useState(false);


  const postId = "hnusduyufsiu"
  const handleHeart = () => {

    try{

      


      const res = axios.post(`http://localhost:4000/post/likes?postId=${postId}` ,
      {headers : token}

      )
     setHeart(!heart);
    }catch(err){


    }
    
  };

  const handleComment = () => {
    setComment(!comment);
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/posts");

      if (res.data.message === "Posts Found!") {
        setData(res.data.allposts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main">
      <h1> Explore </h1>

      <div className="main-centre">
        <div className="container">
          {data.map((item) => (
            <div className="card">
              <b> {item.title}</b>

              <img src={item.imageUrl} alt="preview" />

              <div className="icons">
                <span onClick={handleHeart}>
                  {" "}
                { heart ?   <FaRegHeart />  : <FaHeart/>} {item.likeCounts.length}{" "}
                </span>

                <span onClick={handleComment}>
                  {" "}
                  <LuMessageCircle /> {item.comments.length}{" "}
                </span>
                <span>
                  {" "}
                  <FaShare /> {item.shareCounts.length}{" "}
                </span>
              </div>

              <span> {item.caption}</span>
            </div>
          ))}
        </div>

        <div className="container-right">
          
          {comment && <CommentBox data={data} />}
        </div>
      </div>
    </div>
  );
};

export default GetAllPosts;
