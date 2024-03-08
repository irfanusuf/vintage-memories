import React, { useEffect, useState } from "react";
import "../styles/posts/GetAllPosts.css";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { LuMessageCircle } from "react-icons/lu";
import { FaShare } from "react-icons/fa";
import CommentBox from "./CommentBox";
import AuthenticatedUser from "../authorization/auth";
import Loader from "../sharedComponents/Loader";

const GetAllPosts = () => {
  // AuthenticatedUser()

  const [data, setData] = useState([]);
  const [heart, setHeart] = useState(false);
  // const [likedPosts, setLikedPosts] = useState({});
  const [showComment, setShowComment] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const [noPosts , setNoPosts] = useState(false)

  const handleComment = (param) => {
    setShowComment(!showComment);
    setSelectedPost(param);
  };

  const handleLike = async (postId) => {
    const token = sessionStorage.getItem("token");

    const response = await axios.post(
      `http://localhost:4000/post/likes?postId=${postId}`,
      {}, // empty form
      {
        headers: {
          token: token,
        },
      }
    );

    if (response.status === 200) {
      localStorage.setItem(`liked_${postId}`, "true");
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
    console.log("meow");
    const isLiked = localStorage.getItem(`liked_${postId}`) === "true";
    if (isLiked) {
      setHeart(true);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/posts");

      if (res.data.message === "Posts Found!") {
        setData(res.data.allposts);
        setLoading(false); 

        if (res.data.allposts.length === 0) {
          setNoPosts(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    data.forEach((item) => {
      checkIfLiked(item._id);
    });
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="main">
      <h1> Explore </h1>

      {loading ? (
        <div className="loading">
          <Loader />{" "}
        </div>
      ) : (

        
        <div className="container">
          {noPosts && <div className="no-posts">No Posts available !</div>}
          {data.map((post) => (
            <div className="card">
              <div className="post">
                <div className="heading">
                  <div className="profile-pic"></div>

                  <b>
                    {post && post.author
                      ? post.author.username
                      : "Default Author"}
                  </b>
                </div>

                <b style={{ marginLeft: "45px" }}>
                  {post && post.title ? post.title.toUpperCase() : null}
                </b>

                <img src={post.imageUrl} alt="preview" />

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
      )}
    </div>
  );
};

export default GetAllPosts;
