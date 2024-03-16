import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./userComponents/About";
import Register from "./userComponents/Register";
import Login from "./userComponents/Login";
import Navbar from "./sharedComponents/Navbar";
import Footer from "./sharedComponents/Footer";
import GetAllPosts from "./postComponents/GetAllPosts";
import NotFound from './sharedComponents/NotFound'
import Profile  from './postComponents/Profile'


const App = () => {
  return (
    <>


      <BrowserRouter>

   
        <Navbar />           

        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<GetAllPosts/>} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:userId" element={<Profile/>} />


   
          
        
        </Routes>

        <Footer /> 
      </BrowserRouter>
    </>
  );
};

export default App;
