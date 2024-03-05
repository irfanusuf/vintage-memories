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
  // AuthenticatedUser()

  const [data, setData] = useState([]);
  const [heart, setHeart] = useState(false);
  // const [likedPosts, setLikedPosts] = useState({});
  const [showComment, setShowComment] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleComment = (postId) => {
    setShowComment(!showComment);
    setSelectedPost(postId);
  };

  const handleLike = async (postId) => {
    const token = sessionStorage.getItem("token");
    const response = await axios.post(
      `http://localhost:4000/post/likes?postId=${postId}`, {} ,
      {
        headers: {
          token: token,
        }
      }
    );
 
    if (response.status === 200) {
      localStorage.setItem(`liked_${postId}`, 'true');
      setHeart(!heart);
    }
  };



  // const checkIfLiked = (postId) => {
  //   const isLiked = localStorage.getItem(`liked_${postId}`) === 'true';
  //   // Update the likedPosts state object
  //   setLikedPosts(prevLikedPosts => ({
  //     ...prevLikedPosts,
  //     [postId]: isLiked,
  //   }));
  // };

  const checkIfLiked = (postId) => {
    
    console.log("meow")
    const isLiked = localStorage.getItem(`liked_${postId}`) === 'true';
    if (isLiked) {
      setHeart(true);
    }
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

useEffect(()=>{

  data.forEach(item => {
    checkIfLiked(item._id);
  });

},[data])


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main">
      <h1> Explore </h1>

      <div className="container">
        {data.map((item) => (
          <div className="card">
            <div className="post">
              <div className="heading">
                <div className="profile-pic"> </div>{" "}
                <b>
                  {item && item.author
                    ? item.author.username.toUpperCase()
                    : "Default Author"}
                </b>
              </div>
              <b style={{ marginLeft: "45px" }}>
                {item && item.title ? item.title.toUpperCase() : null}
              </b>
              <img src={item.imageUrl} alt="preview" />

              <div className="icons">
                <span
                  onClick={() => {
                    handleLike(item._id);
                  }}
                >
                  {heart ? <FaHeart style={{color:"red"}}/> :<FaRegHeart /> }
                </span>

                <span
                  onClick={() => {
                    handleComment(item._id);
                  }}
                >
                  <LuMessageCircle />
                </span>
                <span>
                  <FaShare />
                </span>
              </div>

              <div className="counts">
                <span>{item.likeCounts.length}</span>
                <span>{item.comments.length}</span>
                <span>{item.shareCounts.length}</span>
              </div>

              <b> {item.caption}</b>
            </div>

            <CommentBox item={item} selectedPost={selectedPost} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAllPosts;
