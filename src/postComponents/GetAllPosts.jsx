import React, { useEffect, useState } from "react";
import "./GetAllPosts.css";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { LuMessageCircle } from "react-icons/lu";
import { FaShare } from "react-icons/fa";
import CommentBox from "./CommentBox";
import { SlUser } from "react-icons/sl";
import Loader from "../sharedComponents/Loader";
import Likes from "./Likes";

const GetAllPosts = () => {
  const [data, setData] = useState([]);
  const [heart, setHeart] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedLikes, setSelectedLikes] =useState(null)
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [comment, setComment] = useState("");
  const [commentSucess, setcommentSucess] = useState(false);

  const token = sessionStorage.getItem("token");

  const showComment = (postId) => {
    
      setSelectedPost(postId);
    
   
    
  };

  const showLikes = (postId) => {
    if(selectedLikes===null){
      setSelectedLikes(postId);
    }
    else if(selectedLikes===postId){
      setSelectedLikes(null);
    }
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
      setHeart(true)
      
    } else if (response.data.message === `U unliked post_${postId}`) {
      setHeart(false);
    }
  };

  const submitComment = async (e, postId) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:4000/post/comment?postId=${postId} `,
        { comment: comment },

        {
          headers: {
            token: token,
          },
        }
      );

      if (response.data.message === "comment Added") {
        setComment("");
        setcommentSucess(!commentSucess);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
          if (res.data.allposts.length === 0) {
            setText("NO POSTS AVAILABLE!");
          }
        }
      } catch (err) {
        if (
          err.message === "Request failed with status code 403" ||
          "Network Error"
        ) {
          setLoading(false);
        }
        console.error(err.message);
      }
    };
    fetchData();
  }, [heart, commentSucess]);

  return (
    <div className="main">
      <h1> Explore </h1>

      <div className="container">
        {text && (
          <h1 style={{ color: "white", marginTop: "300px" }}> {text} </h1>
        )}

        {!loading ? (
          <Loader />
        ) : (
          data.map((post) => (
            <div className="card">


             {selectedLikes === post._id && <Likes post={post} />} 

              <div className="post">
                <div className="heading">
                  <div className="profile-pic">
                    {post.author.profilepIcUrl ? (
                      <img src={post.author.profilepIcUrl} alt="no-preview" />
                    ) : (
                      <SlUser style={{ fontSize: "20px" }} />
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
                      {post.author.likedPosts.indexOf( post._id ) > -1  ? <FaHeart style={{ color: "red" }} /> : <FaRegHeart /> }

                    {/* {heart === post._id ? (
                      <FaHeart style={{ color: "red" }} />
                    ) : (
                      <FaRegHeart />
                    )} */}
                  </span>

                  <span
                    onClick={() => {
                      showComment(post._id);
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
                  <span   onClick={() => {
                      showLikes(post._id);
                    }} > Show likes </span>
                </div>

                <b> {post.caption}</b>
              </div>

              <CommentBox
                post={post}
                selectedPost={selectedPost}
                submitComment={submitComment}
                comment={comment}
                setComment={setComment}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GetAllPosts;
