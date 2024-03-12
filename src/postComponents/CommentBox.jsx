import React, { useState } from "react";
import Loader from "../sharedComponents/Loader";
import { FaHeart } from "react-icons/fa";
import axios from "axios";

const CommentBox = (props) => {
  const [comment, setComment] = useState("");

  const submitComment = async (e , postId) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:4000/post/comment?postId=${postId}`,
        {comment : comment},
        {
          headers :{
            token : props.token
          }
        }
      );
      console.log(res);

      // console.log(e)
      // console.log(postId)
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div className="comments">
        <h2>Comments</h2>
        {props.selectedPost === props.post._id ? (
          <div>
            {props.post.comments.map((indvidualarrayItem, index) => (
              <div key={index} className="comment">
                <div className="profile-pic">
                  {" "}
                  <img
                    src={indvidualarrayItem.user.profilepIcUrl}
                    alt="no-preview"
                  />{" "}
                </div>
                <b> {indvidualarrayItem.user.username} : </b>
                <span> {indvidualarrayItem.comment}</span>
                <FaHeart
                  style={{ color: "red", position: "absolute", right: "10" }}
                />
              </div>
            ))}
            <form>
              <input
                placeholder="enter your comment here "
                value={comment}
                name="comment"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <button onClick={(e) => {submitComment(e ,props.selectedPost)}}> Comment</button>
            </form>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default CommentBox;
