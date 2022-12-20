import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterComp from "./RegisterComp";
import SigninComp from "./SigninComp";
import Home from "./Home";
import "./Components/SignupPage/SignupPage.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SigninComp />} />
          <Route exact path="/register" element={<RegisterComp />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;