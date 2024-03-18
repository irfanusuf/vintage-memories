import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const { userId } = useParams();

  const [data, setData] = useState({});

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/user?userId=${userId}`
      );

      if (res.data.message === "user Found") {
        setData(res.data.user);
        console.log(res);
      } else {
        console.log("srver Error");
      }
    } catch (err) {
      console.log(err);
    }
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="profile ">
      <div className="profile-container">
        <div className="profile-heading">
          <div className="container-left">
            <img src={data.profilepIcUrl} alt="no" width={100} />
            <p> {data.username} </p>
          </div>

          <div className="container-right">
            <div className="headings">
              <span> Posts</span>
              <span> Followers</span>
              <span> Following </span>
            </div>

            <div className="counts">
              {" "}
              {/* <p> {data.posts.length} </p> */}
              {/* <p> {data.userFollowers.length} </p> */}
              {/* <p> {data.userFollowing.length} </p> */}
            </div>
          </div>
        </div>

        <div className="post-container">


         
          {data.posts.map((singleElement) => (
            <div className="single-post">
            
              <img src= {singleElement.post.imageUrl}  width={180} alt="no-preveiew"/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
