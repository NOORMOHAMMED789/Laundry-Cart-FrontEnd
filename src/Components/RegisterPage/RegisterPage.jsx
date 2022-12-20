import React, { useState } from "react";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [phoneErrorMsg, setPhoneErrorMsg] = useState("");
  const [stateErrorMsg, setStateErrorMsg] = useState("");
  const [distErrorMsg, setDistErrorMsg] = useState("");
  const [addressErrorMsg, setAddressErrorMsg] = useState("");
  const [passErrorMsg, setPassErrorMsg] = useState("");
  const [pinErrorMsg, setPinErrorMsg] = useState("");
  const [userData, setUserData] = useState({
    Name: "",
    Email: "",
    PhoneNumber: "",
    State: "",
    District: "",
    Address: "",
    Password: "",
    pincode: "",
  });

  //! Handles the blur event when you out focus it.
  const blurHandler = () => {
    setNameErrorMsg("");
    setEmailErrorMsg("");
    setPhoneErrorMsg("");
    setStateErrorMsg("");
    setDistErrorMsg("");
    setPassErrorMsg("");
    setPinErrorMsg("");
  };
  //! Handles the name error message.
  const nameChangeHandler = (e) => {
    setUserData({ ...userData, Name: e.target.value });
    if (e.target.value === "") {
      setNameErrorMsg("Name can't be Empty");
    } else {
      setNameErrorMsg("");
    }
  };

  //! Handles the email field error message
  const emailChangeHandler = (e) => {
    setUserData({ ...userData, Email: e.target.value });
    if (
      !e.target.value.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setEmailErrorMsg("please enter a valid Email");
    } else {
      setEmailErrorMsg("");
    }
  };

  //! Handles the phone field error message
  const phoneChangeHandler = (e) => {
    setUserData({ ...userData, PhoneNumber: e.target.value });
    if (e.target.value.length > 10) {
      setPhoneErrorMsg("Phone number must contains 10 digits");
    } else {
      setPhoneErrorMsg("");
    }
  };

  //! Handles the state field error message
  const stateChangeHandler = (e) => {
    setUserData({ ...userData, State: e.target.value });
    if (e.target.value === "" || e.target.value > 4) {
      setStateErrorMsg("State name is Invalid");
    } else {
      setStateErrorMsg("");
    }
  };

  //! Handles the dist field error message
  const distChangeHandler = (e) => {
    setUserData({ ...userData, District: e.target.value });
    if (e.target.value === "") {
      setDistErrorMsg("District name is Invalid");
    } else {
      setDistErrorMsg("");
    }
  };

  //! Handles the address field error message
  const addressChangeHandler = (e) => {
    setUserData({ ...userData, Address: e.target.value });
    if (e.target.value === "") {
      setAddressErrorMsg("Enter Valid Address");
    } else {
      setAddressErrorMsg("");
    }
  };

  //! Handles the password field error message
  const passChangeHandler = (e) => {
    setUserData({ ...userData, Password: e.target.value });
    if (e.target.value.match(/[^a-zA-Z0-9]/) || e.target.value.length < 6) {
      setPassErrorMsg("Must be atleast 6 characters");
    } else {
      setPassErrorMsg("");
    }
  };

  //! Handles the pincode field error message
  const pinChangeHandler = (e) => {
    setUserData({ ...userData, pincode: e.target.value });
    if (e.target.value.length > 6) {
      setPinErrorMsg("Must contains 6 digits");
    } else {
      setPinErrorMsg("");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const {
      Name,
      Email,
      PhoneNumber,
      State,
      District,
      Address,
      Password,
      pincode,
    } = userData;
    console.log({
      Name: Name,
      Email: Email,
      PhoneNumber: PhoneNumber,
      State: State,
      District: District,
      Address: Address,
      Password: Password,
      pincode: pincode,
    });
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
              onChange={nameChangeHandler}
            />
            <label htmlFor="email">Name</label>
            <p className="error_msg">{nameErrorMsg}</p>
          </div>
          <div className="float-label1">
            <input
              type="email"
              required
              onBlur={blurHandler}
              onChange={emailChangeHandler}
            />
            <label htmlFor="email">Email</label>
            <p className="error_msg">{emailErrorMsg}</p>
          </div>
          <div className="float-label1">
            <input
              type="number"
              required
              onBlur={blurHandler}
              onChange={phoneChangeHandler}
            />
            <label htmlFor="email">Phone</label>
            <p className="error_msg">{phoneErrorMsg}</p>
          </div>
          <div className="float-label1">
            <input
              type="text"
              required
              onBlur={blurHandler}
              onChange={stateChangeHandler}
            />
            <label htmlFor="email">State</label>
            <p className="error_msg">{stateErrorMsg}</p>
          </div>
          <div className="float-label1">
            <input
              type="text"
              required
              onBlur={blurHandler}
              onChange={distChangeHandler}
            />
            <label htmlFor="email">District</label>
            <p className="error_msg">{distErrorMsg}</p>
          </div>
          <div className="float-label1">
            <input
              type="text"
              required
              onBlur={blurHandler}
              onChange={addressChangeHandler}
            />
            <label htmlFor="email">Address</label>
            <p className="error_msg">{addressErrorMsg}</p>
          </div>
          <div className="float-label1">
            <input
              type="password"
              required
              onBlur={blurHandler}
              onChange={passChangeHandler}
            />
            <label htmlFor="email">Password</label>
            <p className="error_msg">{passErrorMsg}</p>
          </div>
          <div className="float-label1">
            <input
              type="number"
              required
              onBlur={blurHandler}
              onChange={pinChangeHandler}
            />
            <label htmlFor="email">Pincode</label>
            <p className="error_msg">{pinErrorMsg}</p>
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
