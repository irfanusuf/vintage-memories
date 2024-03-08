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
  AuthenticatedUser();

  const [data, setData] = useState([]);
  const [heart, setHeart] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleComment = (postId) => {
    setShowComment(!showComment);
    setSelectedPost(postId);
  };

  const checkIfLiked = (postId) => {
    const isLiked = localStorage.getItem(`liked_${postId}`) === "true";
    if (isLiked) {
      setHeart(true);
    }
  };

  useEffect(() => {
    data.forEach((post) => {
      checkIfLiked(post._id);
    });
  }, [data]);

  const handleLike = async (postId) => {
    const token = sessionStorage.getItem("token");
    const response = await axios.post(
      `http://localhost:4000/post/likes?postId=${postId}`,
      {},
      {
        headers: {
          token: token,
        },
      }
    );

    if (response.data.message === "U Liked This Post!") {
      setHeart(true);
      localStorage.setItem(`liked_${postId}`, "true");
    } else if (response.data.message === "U took back ur like!") {
      setHeart(false);
      localStorage.removeItem(`liked_${postId}`);
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

  useEffect(() => {
    fetchData();
  }, [heart]);

  return (
    <div className="main">
      <h1> Explore </h1>

      <div className="container">
        {data.map((post) => (
          <div className="card">


            <div className="likes"> <h2> Likes</h2></div>


            <div className="post">
              <div className="heading">
                <div className="profile-pic"> </div>{" "}
                <b>
                  {post && post.author
                    ? post.author.username
                    : "Default Author"}
                </b>
              </div>
              <b style={{ marginLeft: "45px" }}>
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
                  {heart ? (
                    <FaHeart style={{ color: "red" }} />
                  ) : (
                    <FaRegHeart />
                  )}
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

            <CommentBox post={post} selectedPost={selectedPost} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAllPosts;
