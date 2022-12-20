import React, { useState } from "react";
import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [passErrorMsg, setPassErrorMsg] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // const data = useRef();
  const blurHandler = () => {
    setErrorMsg("");
    setPassErrorMsg("");
  };

  const emailChangeHandler = (e) => {
    setData({ ...data, email: e.target.value });
    if (
      !e.target.value.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setErrorMsg("please enter a valid Email");
    } else {
      setErrorMsg("");
    }
  };

  const passChangeHandler = (e) => {
    setData({ ...data, password: e.target.value });
    if (e.target.value.match(/[^a-zA-Z0-9]/) || e.target.value.length < 6) {
      setPassErrorMsg("Must be atleast 6 characters");
    } else {
      setPassErrorMsg("");
    }
  };

  const submitHandler = () => {
    console.log(errorMsg, passErrorMsg);
  };
  return (
    <div className="container">
      <section className="section-1">
        <h1 className="section1_title">Laundry Service</h1>
        <h4 className="section1_para">Doorstep Wash & Dryclean Service</h4>
        <p className="section1_para1">Don't Have An Account?</p>
        <button onClick={() => navigate("/register")} className="section1_btn">
          Resigter
        </button>
      </section>
      <section className="section-2">
        <h1 className="section2_title">SIGN IN</h1>
        <form className="section2_form" onSubmit={submitHandler}>
          <div id="float-label">
            <input
              type="text"
              onBlur={blurHandler}
              onChange={emailChangeHandler}
              required
            />
            <label htmlFor="email">Name</label>
            <p className="section2_error_message">{errorMsg}</p>
          </div>
          <div id="float-label">
            <input
              type="email"
              required
              onBlur={blurHandler}
              onChange={passChangeHandler}
            />
            <label htmlFor="email">Email</label>
            <img
              src="client\Laundry-Cart-FrontEnd\client\public\icons\padlock.svg"
              alt=""
            />
          </div>
          <p className="section2_error_message">{passErrorMsg}</p>
          <p className="section2_forget">forget password ?</p>
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
          <button className="section2_btn">Sign In</button>
        </form>
      </section>
    </div>
  );
};

export default RegisterPage;
