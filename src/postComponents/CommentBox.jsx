import React from "react";

const CommentBox = (props) => {
  return (
    <div>
      <h2>Comments</h2>
      <div>
        {props.data.map((item) => (
          <p> {item.comments.map((param) => param.comment)} </p>
        ))}
      </div>
    </div>
  );
};

export default CommentBox;
