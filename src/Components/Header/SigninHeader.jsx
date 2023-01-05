import React from "react";
import "./SigninHeader.css";
import { useNavigate } from "react-router-dom";

const SigninHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <h1 className="header_title">LAUNDRY</h1>
      <nav>
        <ul className="nav_lists">
          <li className="nav_lists__links" onClick={() => navigate("/home")}>Home</li>
          <li className="nav_lists__links">Pricing</li>
          <li className="nav_lists__links">Career</li>
          <li onClick={() => navigate("/")} className="nav_lists__links color">
            Sign In
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SigninHeader;
