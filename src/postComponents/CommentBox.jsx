import React, { useState } from "react";
import Loader from "../sharedComponents/Loader";
import { FaHeart } from "react-icons/fa";

const CommentBox = (props) => {
  return (
    <>
     <div className="comments">
       <h2>Comments</h2>


        {props.selectedPost === props.post._id ? (
          <div>
            {props.post.comments.map((singleEntity) => (
              <div className="comment">
                <div className="profile-pic"> </div>
                <b> {singleEntity.user ? singleEntity.user.username : "default user"} : </b>
                <span> {singleEntity.comment}</span>
                <span>  <FaHeart style={{ color: "red" }} /></span>
              </div>
            ))}
          </div>
        ) : (<Loader/>)}
     </div>
       
      
      </>
  );
};

export default CommentBox;
