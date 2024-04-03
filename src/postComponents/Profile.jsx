import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Profile.css";
import { SlUser } from "react-icons/sl";
import { baseUrl } from "../config/config";
import { HiDotsVertical } from "react-icons/hi";

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [follow , setFollow] = useState(false)

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/user?userId=${userId}`
      );

      if (res.data.message === "user Found") {
        setUser(res.data.user);
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

  const handleFollow = async (userId) => {
    try {
      const res = await axios.post(
        `${baseUrl}/user/follow?userToFollow=${userId}`,
        {},
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
        console.log(res)
      setFollow(!follow)

      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile ">
      <div className="profile-container">

        <div className="header"> <HiDotsVertical/> </div>

        <div className="profile-heading">

          <div className="container-left">
            <div className="profile-pic">
              {user.profilepIcUrl ? (
                <img src={user.profilepIcUrl} alt="no" width={100} />
              ) : (
                <SlUser style={{ fontSize: "30px" }} />
              )}
            </div>

            <p> {user.username} </p>
          </div>

          <div className="container-right">
            <div className="headings">
              <span> Posts</span>
              <span> Followers</span>
              <span> Following </span>
            </div>

            <div className="counts">
            
              <p> {user && user.posts && user.posts.length} </p>
              <p> {user && user.posts && user.userFollowers.length} </p>
              <p> {user && user.posts && user.userFollowing.length} </p>
            </div>

            <div className="btns">
             
              <button
                onClick={() => {
                  handleFollow(user._id);
                }}
              >
                
              {follow ? "UnFollow" : "Follow"}
              </button>

              <button> Message</button>
            </div>
          </div>



        </div>

        <div className="bio">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo enim aliquid quam consequuntur recusandae ipsa doloribus exercitationem vero voluptates, magnam voluptatem ex totam culpa facere corporis iure officia cumque ipsum.
        </div>

        <div className="post">
          {user &&
            user.posts &&
            user.posts.map((singleElement) => (
              <div className="single-post">
                <img src={singleElement.post && singleElement.post.imageUrl} alt="no-preveiew" />
              </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default Profile;
