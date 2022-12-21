import React from "react";
import "./SigninHeader.css";

const SigninHeader = () => {
  return (
    <div className="header">
      <h1 className="header_title">LAUNDRY</h1>
      <nav>
        <ul className="nav_lists">
          <li className="nav_lists__links">Home</li>
          <li className="nav_lists__links">Pricing</li>
          <li className="nav_lists__links">Career</li>
          <li className="nav_lists__links color">Sign In</li>
        </ul>
      </nav>
    </div>
  );
};

export default SigninHeader;
