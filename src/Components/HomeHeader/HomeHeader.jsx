import React, { useState } from "react";
import "./HomeHeader.css";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../authOperations";

const SigninHeader = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const changeHandler = () => {
    setShowLogout(!showLogout);
  };
  const logoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="header">
      <h1 className="header_title">LAUNDRY</h1>
      <nav>
        <ul className="nav_lists">
          <li className="nav_lists__links" onClick={() => navigate("/home")}>Home</li>
          <li className="nav_lists__links">Pricing</li>
          <li className="nav_lists__links">Career</li>
          <li className="nav_lists__links color" onClick={changeHandler}>
            <span className="home_pic"><img src="/icons/avatar.png" alt="Profile" width="40px"/></span>
            {getToken("Username")}
          </li>
        </ul>
      </nav>
      {showLogout && (
        <div onClick={logoutHandler} className="logout">
          Logout
        </div>
      )}
    </div>
  );
};

export default SigninHeader;
