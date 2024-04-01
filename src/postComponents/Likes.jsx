import React from "react";
import { SlUser } from "react-icons/sl";

const Likes = (props) => {
  return (
    <div className="likes">
      <h2> Likes</h2>
      {props.post.likeCounts.map((indvidualLiker) => (
        <div>
          <div className="profile-pic">
            {indvidualLiker.user.profilepIcUrl ? (
              <img src={indvidualLiker.user.profilepIcUrl} alt="no-preview" />
            ) : (
              <SlUser style={{ fontSize: "20px" }} />
            )}
          </div>

          <b>{indvidualLiker.user.username} </b>
        </div>
      ))}
    </div>
  );
};

export default Likes;
