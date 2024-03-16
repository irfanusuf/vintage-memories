import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
      } else {
        console.log("srver Error");
      }
    } catch (err) {
      console.log(err);
    }
  }
 , [userId])
 
 
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div>
      <img src={data.profilepIcUrl} alt="no" width={300} />
      <p> {data.username} </p>
      {/* <p>  {data.userFollowers.length} </p> */}
      {/* <p>  {data.userFollowing.length} </p> */}
      {/* <p>  {data.posts.length} </p> */}
    </div>
  );
};

export default Profile;
