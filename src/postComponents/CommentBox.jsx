import React, { useState } from "react";
import Loader from "../sharedComponents/Loader";

const CommentBox = (props) => {
  return (
    <>
     <div className="comments">
       <h2>Comments</h2>
        {props.selectedPost === props.item._id ? (
          <div>
            {props.item.comments.map((comment, index) => (
              <div key={index} className="comment">
                <b> {comment.user.username} : </b>
                <span> {comment.comment}</span>
              </div>
            ))}
          </div>
        ) : (<Loader/>)}
     </div>
       
      
      </>
  );
};

export default CommentBox;
