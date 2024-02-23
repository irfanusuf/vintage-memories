import React, { useState } from "react";
import "../styles/Home.css";

const Home = () => {
  //use state hook      it is used for changing current state

  const [data, setData] = useState(false);   

  const handleClick = () => {
    setData(!data);
    console.log(data)
  };




  return (
    <div className="home">
      <h1> Welecome to the pinstagram</h1>

      <div className="buttons">
        <button onClick={handleClick}> Again Click me  </button>

     <h1>{data? "light On " : ""}</h1>


      </div>
    </div>
  );
};

export default Home;
