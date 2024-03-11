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
            {props.post.comments.map((indvidualarrayItem, index) => (
              <div key={index} className="comment">
                <div className="profile-pic"> <img src={indvidualarrayItem.user.profilepIcUrl} alt="no-preview"/> </div>
                <b> {indvidualarrayItem.user.username} : </b>
                <span> {indvidualarrayItem.comment}</span>
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
