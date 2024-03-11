import React from "react";
import Loader from "../sharedComponents/Loader";
import { FaHeart } from "react-icons/fa";
import { SlUser } from "react-icons/sl";


const CommentBox = (props) => {
  
 

  return (
    <>
      <div className="comment-box">
        <h2>Comments</h2>
        {props.selectedPost === props.post._id ? (
          <div className="comments">
            {props.post.comments.map((indvidualarrayItem, index) => (
              <div key={index} className="comment">
                <div className="profile-pic">
                  {indvidualarrayItem.user.profilepIcUrl ? (
                    <img
                      src={indvidualarrayItem.user.profilepIcUrl}
                      alt="no-preview"
                    />
                  ) : (
                    <SlUser style={{ fontSize: "20px" }} />
                  )}
                </div>
                <b> {indvidualarrayItem.user.username} : </b>
                <span> {indvidualarrayItem.comment}</span>
                <FaHeart
                  style={{ color: "red", position: "absolute", right: "10" }}
                />
              </div>
            ))}
          </div>
        ) : (
          <Loader />
        )}

        <div className="comment-input">
          <form>
            <input
              type="text"
              value={props.comment}
              name="comment"
              onChange={(e) => {
                props.setComment(e.target.value);
              }}
            />

            <button
              onClick={(e) => {
                props.submitComment(e, props.selectedPost);
              }}
              disabled={props.selectedPost === null}
            >
              {" "}
              Comment{" "}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CommentBox;
