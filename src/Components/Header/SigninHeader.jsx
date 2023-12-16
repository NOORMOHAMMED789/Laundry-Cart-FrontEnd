import React from "react";
import "./SigninHeader.css";
import { useNavigate } from "react-router-dom";
import NavItems from "./NavItems";

const SigninHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="header stdP">
      <h1 onClick={() => navigate("/")} className="font27 headerTitle">
        Laundry
      </h1>
      <div className="">
        <NavItems />
      </div>
    </div>
  );
};
export default SigninHeader;
