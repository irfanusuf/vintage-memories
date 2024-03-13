import React, { useEffect, useState } from "react";
import "./GetAllPosts.css";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { LuMessageCircle } from "react-icons/lu";
import { FaShare } from "react-icons/fa";
import CommentBox from "./CommentBox";
import { SlUser } from "react-icons/sl";

const GetAllPosts = () => {
  const [data, setData] = useState([]);
  const [heart, setHeart] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentSucess ,setCommentSucess] =useState(false)


  

  const token = sessionStorage.getItem("token");
  const userId = sessionStorage.getItem("userId")

  const handleComment = (postId) => {
  
    setSelectedPost(postId);
  };

  const handleLike = async (postId) => {
    const response = await axios.post(
      `http://localhost:4000/post/likes?postId=${postId}`,
      {},
      {
        headers: {
          token: token,
        },
      }
    );

    console.log(response);
    if (response.data.message === `U Liked post _${postId}`) {
      setHeart(postId);
    } else if (response.data.message === `U unliked post_${postId}`) {
      setHeart(null);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/posts",
        
        {
          headers: {
            token: token,
          },
        }
      );
      if (res.data.message === "Posts Found!") {
        setData(res.data.allposts);
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [heart ,commentSucess]);

  return (
    <div className="main">
      <h1> Explore </h1>

      <div className="container">
        {data.map((post) => (
          <div className="card">
            <div className="likes">
              {" "}
              <h2> Likes</h2>
            </div>

            <div className="post">
              <div className="heading">
                <div className="profile-pic">
                  {post.author.profilepIcUrl ? (
                    <img src={post.author.profilepIcUrl} alt="no-preview" />
                  ) : (
                    <SlUser style={{ fontSize: "30px" }} />
                  )}
                </div>

                <b>
                  {post && post.author
                    ? post.author.username
                    : "Default Author"}
                </b>
              </div>
              <b style={{ marginTop: "10px" }}>
                {post && post.title ? post.title.toUpperCase() : null}
              </b>

              <img
                onDoubleClick={() => {
                  handleLike(post._id);
                }}
                src={post.imageUrl}
                alt="preview"
              />

              <div className="icons">
                <span
                  onClick={() => {
                    handleLike(post._id);
                  }}
                >

                  {post.likeCounts.findIndex((param)=> param.user._id.toString() === userId) > -1 ? <FaHeart style={{ color: "red" }} /> : <FaRegHeart />}
                
                </span>

                <span
                  onClick={() => {
                    handleComment(post._id);
                  }}
                >
                  <LuMessageCircle />
                </span>
                <span>
                  <FaShare />
                </span>
              </div>

              <div className="counts">
                <span>{post.likeCounts.length}</span>
                <span>{post.comments.length}</span>
                <span>{post.shareCounts.length}</span>
              </div>

              <b> {post.caption}</b>
            </div>

            <CommentBox post={post}
             selectedPost={selectedPost} 
              token ={token}
              setCommentSucess = {setCommentSucess}
              commentSucess = {commentSucess}
              />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAllPosts;
