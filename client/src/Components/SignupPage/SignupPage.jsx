import React from "react";
import "./SignupPage.css";

const SignupPage = () => {
  return (
    <div className="container">
      <section className="section-1">
        <h1 className="section1_title">Laundry Service</h1>
        <h4 className="section1_para">Doorstep Wash & Dryclean Service</h4>
        <p className="section1_para1">Don't Have An Account?</p>
        <button className="section1_btn">Resigter</button>
      </section>
      <section className="section-2">
        <h1 className="section2_title">SIGN IN</h1>
        <form className="section2_form">
          <div id="float-label">
            <input type="email" />
            <label htmlFor="email">Mobile/Email</label>
          </div>
          <div id="float-label">
            <input type="password" />
            <label htmlFor="email">Password</label>
          </div>
          <p className="section2_forget">forget password ?</p>
        </form>
        <button className="section2_btn">Sign In</button>
      </section>
    </div>
  );
};

export default SignupPage;
