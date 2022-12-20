import React, { useState } from "react";
import "./RegisterPage.css";

const RegisterPage = () => {
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
    <div className="container1">
      <section className="register_text">
        <h1 className="register_title">Laundry Service</h1>
        <h4 className="register_para">Doorstep Wash & Dryclean Service</h4>
        <p className="section1_para11">Don't Have An Account?</p>
        <button className="section1_btn1">Sign In</button>
      </section>
      <section className="register-2">
        <h1 className="register2_title">REGISTER</h1>
        <form className="register2_form" onSubmit={submitHandler}>
          <div className="float-label1">
            <input
              type="text"
              required
              onBlur={blurHandler}
              onChange={passChangeHandler}
            />
            <label htmlFor="email">Name</label>
          </div>
          <div className="float-label1">
            <input
              type="email"
              required
              onBlur={blurHandler}
              onChange={passChangeHandler}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="float-label1">
            <input
              type="number"
              required
              onBlur={blurHandler}
              onChange={passChangeHandler}
            />
            <label htmlFor="email">Phone</label>
          </div>
          <div className="float-label1">
            <input
              type="text"
              required
              onBlur={blurHandler}
              onChange={passChangeHandler}
            />
            <label htmlFor="email">State</label>
          </div>
          <div className="float-label1">
            <input
              type="text"
              required
              onBlur={blurHandler}
              onChange={passChangeHandler}
            />
            <label htmlFor="email">District</label>
          </div>
          <div className="float-label1">
            <input
              type="text"
              required
              onBlur={blurHandler}
              onChange={passChangeHandler}
            />
            <label htmlFor="email">Address</label>
          </div>
          <div className="float-label1">
            <input
              type="password"
              required
              onBlur={blurHandler}
              onChange={passChangeHandler}
            />
            <label htmlFor="email">Password</label>
          </div>
          <div className="float-label1">
            <input
              type="number"
              required
              onBlur={blurHandler}
              onChange={passChangeHandler}
            />
            <label htmlFor="email">Pincode</label>
          </div>
          <input type="checkbox" className="terms_conditions" id="terms" />
          <label htmlFor="terms" className="conditions">
            I agree to Terms & Condition receiving marketing and promotional
            materials
          </label>
          <button className="section2_btn1">Register</button>
        </form>
      </section>
    </div>
  );
};

export default RegisterPage;
