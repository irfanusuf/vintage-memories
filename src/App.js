import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./userComponents/About";
import Register from "./userComponents/Register";
import Login from "./userComponents/Login";
import Navbar from "./sharedComponents/Navbar";
import Footer from "./sharedComponents/Footer";
import GetAllPosts from "./postComponents/GetAllPosts";


const App = () => {
  return (
    <>


      <BrowserRouter>

   
        <Navbar />           

        <Routes>
          <Route path="/" element={<GetAllPosts/>} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
   
          
        
        </Routes>

        <Footer /> 
      </BrowserRouter>
    </>
  );
};

export default App;
