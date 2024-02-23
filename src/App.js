import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./sharedComponents/Navbar";
import Footer from "./sharedComponents/Footer";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />       

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
