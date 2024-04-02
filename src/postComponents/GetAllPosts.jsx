import React, { useCallback, useEffect, useState } from "react";
import "./GetAllPosts.css";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { LuMessageCircle } from "react-icons/lu";
import { FaShare } from "react-icons/fa";
import CommentBox from "./CommentBox";
import { SlUser } from "react-icons/sl";
import { Link } from "react-router-dom";
import Loader from "../sharedComponents/Loader";
import { ToastContainer, toast } from "react-toastify";
import { HiDotsVertical } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";
import { MdReport } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { baseUrl } from "../config/config";
import IsAuthenticated from "../authorization/IsAuthenticated"

const GetAllPosts = (props) => {
  IsAuthenticated()
  const [data, setData] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postnotAvailable, setpostnotAvailable] = useState("");
  const [dropdown, handleDropDown] = useState(null);
  const token = localStorage.getItem("token");
  const userId =localStorage.getItem("userId");
  const handleComment = (postId) => {
    setSelectedPost(postId);
  };

  const handleDelete = async  (postId , imgPublicID)  => {
    try {
      const res =  await axios.post(
        `${baseUrl}/post/deletePost?postId=${postId}&imgPublicID=${imgPublicID}`,
        {},
        {
          headers: {
            token: token,
          },
        }
      );
      
      console.log(res)

    
      if(res.data.message === "Post Deleted!"){
        toast.success("Deleted!")
        setRender(!render)
      }
      else{
        toast.error("Can't del post !")
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async (postId) => {
    const response = await axios.post(
      `${baseUrl}/post/likes?postId=${postId}`,
      {},
      {
        headers: {
          token: token,
        },
      }
    );

    if (response.data.message === `U Liked post _${postId}`) {
      setRender(!render);
    } else if (response.data.message === `U unliked post_${postId}`) {
      setRender(!render);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${baseUrl}/posts`,

        {
          headers: {
            token: token,
          },
        }
      );

      const reverseArray = res.data.allposts.reverse()
      if (res.data.message === "Posts Found!") {
        setData(reverseArray);

        if (res.data.allposts.length === 0) {
          setpostnotAvailable("NO POSTS AVAILABLE !");
         
        }
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }, [token]);


  

  useEffect(() => {
    fetchData();
  }, [render,  fetchData ,  props.opacity]);

  return (
    <>
      <ToastContainer position="top-center" />

      <div className={props.opacity ? "opacity main" :"main"}>
        <h1> Explore Memories</h1>

        <div className="container">
         

          {loading ? (
            data.map((post) => (
              <div className="card">
                <div className="post">
                  <div className="heading">
                    <div className="profile-pic">
                      {post.author.profilepIcUrl ? (
                        <img src={post.author.profilepIcUrl} alt="no-preview" />
                      ) : (
                        <SlUser style={{ fontSize: "30px" }} />
                      )}
                    </div>

                    <Link to={`/profile/${post.author._id}`}>
                     
                        {post && post.author
                          ? post.author.username
                          : "Default Author"}
                    
                    </Link>

                    <HiDotsVertical
                      style={{
                        fontSize: "22px",
                        position: "absolute",
                        right: "0",
                      }}
                      onClick={() => {
                        handleDropDown(post._id);
                      }}
                    />

                    <div
                      className={
                        dropdown === post._id ? "drop-down" : "display-none "
                      }
                    >
                      <span>
                        {" "}
                        <AiFillDelete
                          style={{ color: "red", fontSize: "larger" }}
                          onClick={() => {
                            handleDelete(post._id , post.imgPublicID);
                          }}
                        />
                      </span>

                      <span>
                        {" "}
                        <MdReport
                          style={{ color: "red", fontSize: "larger" }}
                        />{" "}
                      </span>

                      <span>
                        {" "}
                        <IoMdClose
                          onClick={() => {
                            handleDropDown(null);
                          }}
                          style={{ fontSize: "larger" }}
                        />
                      </span>
                    </div>
                  </div>

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
                      {post.likeCounts.findIndex(
                        (param) => param.user._id.toString() === userId
                      ) > -1 ? (
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

                  <b style={{ marginTop: "10px" }}>
                    {post && post.title ? post.title.toUpperCase() : null}
                  </b>

                  <b> {post.caption}</b>
                </div>

                <CommentBox
                  post={post}
                  selectedPost={selectedPost}
                  setSelectedPost={setSelectedPost}
                  token={token}
                  render={render}
                  setRender={setRender}
                  
                />
              </div>
            ))
          ) : (
            <Loader />
          )}

          {data.length === 0 && (
            <h1 style={{ color: "wheat", marginTop: "300px" }}>
              {postnotAvailable}
            </h1>
          )}


        </div>
      </div>
    </>
  );
};

export default GetAllPosts;
