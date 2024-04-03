import React, { useState } from "react";
import axios from "axios";

import { FaHeart } from "react-icons/fa";
import { SlUser } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import { AiFillDelete } from "react-icons/ai";
import { MdReport } from "react-icons/md";
import { toast } from "react-toastify";
import { baseUrl } from "../config/config";
import Loader from "../sharedComponents/Loader";



const CommentBox = (props) => {
  const [comment, setComment] = useState("");
  const [showDropdown, setShowDropDown] = useState(null);
  const [loading , setLoading] =useState(false)
  const handleDropDown = (commentId) => {
    setShowDropDown(commentId);
  };
 
  const submitComment = async (e, postId) => {
    e.preventDefault();

    try {
      setLoading(true)
      if(comment !== ""){
         const res = await axios.post(
        `${baseUrl}/post/comment?postId=${postId}`,
        { comment: comment },
        {
          headers: {
            token: props.token,
          },
        }
      );

      if (res.data.message === "comment Added") {
        props.setRender(!props.render);
        setComment(""); // form sanitization
      }
      }
     
    } catch (err) {
      console.error(err.message);
    }finally{
      setLoading(false)
    }
  };

  const handleDelete = async (postId, commentId , commentUser) => {
    try {
      const res = await axios.post(
        `${baseUrl}/post/deleteCommment?postId=${postId}&commentId=${commentId}&commentUser=${commentUser}`,

        {},
        {
          headers: {
            token: props.token,
          },
        }
      );

      if (res.data.message === "Comment deleted!") {
        props.setRender(!props.render);
      }
      else{
        toast.error(res.data.message)
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const reverseComments = props.post.comments.reverse()
  // const handleAbuser = async () => {};

  return (
    <>
     
      <div
        className={
          props.selectedPost === props.post._id
            ? "comments animate__animated animate__bounceInUp"
            : "display-none "
        }
      >              
        <IoMdClose
          className="close"
          onClick={() => {
            props.setSelectedPost(null);
          }}
        />

        <h2>Comments</h2>

        <div className="comment-container">
          <div className="overflow">
            {props.post.comments.map((element, index) => (
              <div key={index} className="comment">
                <div className="profile-pic">
                  {element.user.profilepIcUrl ? (
                    <img src={element.user.profilepIcUrl} alt="no-preview" />
                  ) : (
                    <SlUser style={{ fontSize: "20px" }} />
                  )}
                </div>

               <span><b> @{element.user.username} </b> {element.comment} </span> 

                

                <FaHeart
                  style={{ color: "red", paddingRight:"10px" ,paddingTop :"10px"}}
                />

                <HiDotsVertical
                  style={{ fontSize: "22px" ,paddingTop :"7px"}}
                  onClick={() => {
                    handleDropDown(element._id);
                  }}
                />

                <div
                  className={
                    showDropdown === element._id ? "drop-down" : "display-none "
                  }
                >
                  <span>
                    {" "}
                    <AiFillDelete
                      style={{ color: "red", fontSize: "larger" }}
                      onClick={() => {
                        handleDelete(props.selectedPost, element._id , element.user._id);
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
                    
                    <IoMdClose
                      onClick={() => {
                        handleDropDown(null);
                      }}

                      style={{fontSize: "larger" }}
                    />
                  </span>


                </div>


              </div>
            ))}
          </div>

          {loading && <Loader/>}

          <form className="form">
            <input
              placeholder="enter your comment here "
              value={comment}
              name="comment"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button
              onClick={(e) => {
                submitComment(e, props.selectedPost);
              }}
              disabled={loading && comment ===""}
            >
              Comment
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CommentBox;
