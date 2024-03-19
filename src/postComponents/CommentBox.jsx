import React, { useState } from "react";
import Loader from "../sharedComponents/Loader";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import { SlUser } from "react-icons/sl";

const CommentBox = (props) => {
  
  const [comment, setComment] = useState("");




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
      }
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
            {props.post.comments.map((element, index) => (
              <div key={index} className="comment">


                <div className="profile-pic">
                  
                { element.user.profilepIcUrl ?  <img
                    src={element.user.profilepIcUrl}
                    alt="no-preview"
                  />  :  <SlUser style={{ fontSize: "30px" }}/>}
                </div>

                <b> {element.user.username} : </b>


                <span> {element.comment}</span>

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
              <button
                onClick={(e) => {
                  submitComment(e, props.selectedPost);
                }}
              >
                
                Comment
              </button>
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
