import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { SlUser } from "react-icons/sl";
import { IoMdClose } from "react-icons/io";

const CommentBox = (props) => {
  const [comment, setComment] = useState("");
  // const [showCommentBox, setShowCommentBox] = useState("");

  const submitComment = async (e, postId) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:4000/post/comment?postId=${postId}`,
        { comment: comment },
        {
          headers: {
            token: props.token,
          },
        }
      );

      if (res.data.message === "comment Added") {
        props.setCommentSucess(!props.commentSucess);
        setComment(""); // form sanitization
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div
        className={
          props.selectedPost === props.post._id ?
           "comments animate__animated animate__bounceInLeft" :
            "display-none "}>

        <IoMdClose className="close" onClick={()=>{props.setSelectedPost(null)}} />

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

                <b> {element.user.username} : </b>

                <span> {element.comment}</span>

                <FaHeart
                  style={{ color: "red", position: "absolute", right: "10" }}
                />
              </div>
            ))}
          </div>

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
