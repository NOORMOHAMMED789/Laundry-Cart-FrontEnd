import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterComp from "./RegisterComp";
import SigninComp from "./SigninComp";
import "./Components/SignupPage/SignupPage.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<SigninComp />} />
          <Route exact path="/register" element={<RegisterComp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
