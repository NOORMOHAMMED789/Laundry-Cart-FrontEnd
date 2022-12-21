import React, { useState } from "react";
import "./HomeHeader.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SigninHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
          <li className="nav_lists__links">Home</li>
          <li className="nav_lists__links">Pricing</li>
          <li className="nav_lists__links">Career</li>
          <li className="nav_lists__links color" onClick={changeHandler}>
            <span className="home_pic"></span>
            {location.state.name}
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
