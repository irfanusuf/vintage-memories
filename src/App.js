import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./userComponents/About";
import Register from "./userComponents/Register";
import Login from "./userComponents/Login";
import Navbar from "./sharedComponents/Navbar";
import Footer from "./sharedComponents/Footer";
import GetAllPosts from "./postComponents/GetAllPosts";
import NotFound from "./sharedComponents/NotFound";
import Profile from "./postComponents/Profile";
import PostofFollowing from "./postComponents/PostofFollowing";
// import AuthenticatedUser from './authorization/auth'

const App = () => {
  const token = sessionStorage.getItem("token");
  const [opacity , setOpacity] = useState(false)

  return (
    <>
      <BrowserRouter>
        {token !== null && <Navbar setOpacity = {setOpacity} />}

        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route
            path="/"
            element={token == null ? <Login /> : <PostofFollowing />}
          />
          <Route path="/explore" element={<GetAllPosts opacity ={opacity}/>} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
