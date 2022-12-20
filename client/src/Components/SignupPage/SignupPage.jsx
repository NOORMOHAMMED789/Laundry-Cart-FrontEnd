import React, { useState } from "react";
import "./SignupPage.css";

const SignupPage = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [passErrorMsg, setPassErrorMsg] = useState("");

  // const data = useRef();
  const blurHandler = () => {
    setErrorMsg("");
    setPassErrorMsg("");
  };

  const emailChangeHandler = (e) => {
    if (!e.target.value.includes("@")) {
      setErrorMsg("please enter a valid Email");
    } else {
      setErrorMsg("");
    }
  };

  const passChangeHandler = (e) => {
    if (e.target.value.match(/[^a-zA-Z0-9]/) || e.target.value.length < 6) {
      setPassErrorMsg("Must be atleast 6 characters");
    } else {
      setPassErrorMsg("");
    }
  };
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
            <input
              type="email || number"
              onBlur={blurHandler}
              onChange={emailChangeHandler}
              required
            />
            <label htmlFor="email">Mobile/Email</label>
            <p className="section2_error_message">{errorMsg}</p>
          </div>
          <div id="float-label">
            <input
              type="password"
              required
              onBlur={blurHandler}
              onChange={passChangeHandler}
            />
            <label htmlFor="email">Password</label>
            <img
              src="client\Laundry-Cart-FrontEnd\client\public\icons\padlock.svg"
              alt=""
            />
          </div>
          <p className="section2_error_message">{passErrorMsg}</p>
          <p className="section2_forget">forget password ?</p>
        </form>
        <button className="section2_btn">Sign In</button>
      </section>
    </div>
  );
};

export default SignupPage;
