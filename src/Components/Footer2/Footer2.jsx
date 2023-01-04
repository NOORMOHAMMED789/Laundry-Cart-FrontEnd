import React from "react";
import { Link } from "react-router-dom";
import "./Footer2.css";

const Footer2 = () => {
  return (
    <div className="footer2">
      <section className="footer2_sec1">
        <h4 className="footer2_title">ABOUT US</h4>
        <p className="footer2_para">Doorstep Wash & Dryclean Service</p>
      </section>
      <section className="footer2_sec2">
        <ul className="footer2_first__ul">
          <Link to={"/home"}><li>Home</li></Link>
          <Link to={"/"}><li>Sign In</li></Link>
          <Link to={"/register"}><li>Register</li></Link>
          <li>Pricing</li>
        </ul>
      </section>
      <section className="footer2_sec3">
        <ul className="footer2_first__ul">
          <li>Career</li>
          <li>Blogs</li>
          <li>Create</li>
          <li>Contact</li>
        </ul>
      </section>

      <section className="footer2_sec2">
        <h4 className="footer2_sec4__title">SOCIAL MEDIA</h4>
        <div className="footer2_socialmedia">
          <img
            src="/icons/facebook.svg"
            alt="facebook"
            style={{ width: "30px" }}
          />
          <img
            src="/icons/instagram.svg"
            alt="instagram"
            style={{ width: "30px" }}
          />
          <img
            src="/icons/linkedin.svg"
            alt="linkedin"
            style={{ width: "30px" }}
          />
        </div>
      </section>
    </div>
  );
};

export default Footer2;
