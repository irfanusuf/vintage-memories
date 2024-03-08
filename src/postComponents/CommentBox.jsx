import React from "react";
import Loader from "../sharedComponents/Loader";
import { FaHeart } from "react-icons/fa";


const CommentBox = (props) => {
  return (
    <>
     <div className="comments">
       <h2>Comments</h2>
        {props.selectedPost === props.post._id ? (
          <div>
            {props.post.comments.map((comment, index) => (
              <div key={index} className="comment">
                <div className="profile-pic"></div>
                <b> {comment.user.username} : </b>
                <span> {comment.comment}</span>
                <FaHeart style={{color:"red" , position : "absolute" , right : "10"}}/>
              </div>
            ))}
          </div>
        ) : (<Loader/>)}
     </div>
       
      
      </>
  );
};

export default CommentBox;
