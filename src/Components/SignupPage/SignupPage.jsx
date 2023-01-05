import React, { useState } from "react";
import "./SignupPage.css";
import { useNavigate } from "react-router-dom";
import { getToken, setToken } from "../../authOperations";
const URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const SignupPage = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [passErrorMsg, setPassErrorMsg] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  // const data = useRef();
  const blurHandler = () => {
    setErrorMsg("");
    setPassErrorMsg("");
    setMessage("");
  };

  const emailChangeHandler = (e) => {
    setData({ ...data, email: e.target.value });
    if (
      !e.target.value.match(
        /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setErrorMsg("please enter a valid Email");
    } else {
      setErrorMsg("");
    }
  };

  const passChangeHandler = (e) => {
    setData({ ...data, password: e.target.value });
    if (!e.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      setPassErrorMsg("At least 8 characters , 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character consider as strong password");
    } else {
      setPassErrorMsg("");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let { email, password } = data;
    email = email.toLowerCase();
    fetch(`${URL}/api/v1/user/login`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "Failed") {
          setMessage(data.message);
        } else {
          const token = data.token;
          setToken("token", token);
          if (token === getToken("token")) {
            console.log(token);
            console.log(data.name);
            setToken("Username", data.name);
            navigate("/home");
          }
        }
      })
      .catch((e) => {
        console.log(e);
        setMessage("Server down. try after sometime !!");
      });
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
            <label htmlFor="email">Email</label>
            <p className="section2_error_message">{errorMsg}</p>
          </div>
          <div id="float-label">
            <input
              type="password"
              required
              onBlur={blurHandler}
              onChange={passChangeHandler}
              name="password field"
            />
            <label htmlFor="email">Password</label>
          </div>
          <p className="section2_error_message">{passErrorMsg}</p>
          <p className="section2_forget">Forget password ?</p>
          <p className="invalid">{message}</p>
          <button className="section2_btn" onClick={submitHandler}>
            Sign In
          </button>
        </form>
      </section>
    </div>
  );
};

export default SignupPage;
