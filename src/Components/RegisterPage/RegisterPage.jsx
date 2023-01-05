import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
const URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [phoneErrorMsg, setPhoneErrorMsg] = useState("");
  const [stateErrorMsg, setStateErrorMsg] = useState("");
  const [distErrorMsg, setDistErrorMsg] = useState("");
  const [addressErrorMsg, setAddressErrorMsg] = useState("");
  const [passErrorMsg, setPassErrorMsg] = useState("");
  const [pinErrorMsg, setPinErrorMsg] = useState("");
  // const [modal, setModal] = useState(false);
  const [btnBool, setBtnBool] = useState(true);
  const [userData, setUserData] = useState({
    Name: "",
    Email: "",
    PhoneNumber: "",
    State: "",
    District: "",
    Address: "",
    Pincode: "",
    Password: "",
  });

  // const toggleModal = () => {
  //   setModal(!modal);
  // };

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
        /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
    if (e.target.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
      setPassErrorMsg("Strong Password");
    } else if (e.target.value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
      setPassErrorMsg("Medium Password")
    } else {
      setPassErrorMsg("Weak Password");
    }
  };

  //! Handles the pincode field error message
  const pinChangeHandler = (e) => {
    setUserData({ ...userData, Pincode: e.target.value });
    if (e.target.value.length > 6) {
      setPinErrorMsg("Must contains 7 digits");
    } else {
      setPinErrorMsg("");
    }
  };

  const submitHandler = () => {
    let {
      Name,
      Email,
      PhoneNumber,
      State,
      District,
      Address,
      Pincode,
      Password,
    } = userData;
    Email = Email?.toLowerCase();
    fetch(`${URL}/api/v1/user/register`, {
      method: "POST",
      body: JSON.stringify({
        name: Name,
        email: Email,
        phone: PhoneNumber,
        state: State,
        district: District,
        address: Address,
        pincode: Pincode,
        password: Password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message === "Account already exists") {
          // setModal(!modal);
          alert("User Already Exists.Please, Login !!!");
        } else if (data.status === "Success") {
          alert("Registration Successful");
        } else {
          alert("Unable to create Account");
          console.log(data.message);
        }
        navigate("/");
      })
      .catch((e) => {
        alert(e.message);
      });
  };

  const buttonToggle = () => {
    setBtnBool(!btnBool);
  }

  return (
    <div className="container1">
      <section className="register_text">
        <h1 className="register_title">Laundry Service</h1>
        <h4 className="register_para">Doorstep Wash & Dryclean Service</h4>
        <p className="section1_para11">Don't Have An Account?</p>

        <button onClick={() => navigate("/")} className="section1_btn1">
          Sign In
        </button>
      </section>
      <section className="register-2">
        <h1 className="register2_title">REGISTER</h1>
        <form className="register2_form">
          <div className="float-label1">
            <input
              type="text"
              required
              onBlur={blurHandler}
              onChange={nameChangeHandler}
            />
            <label htmlFor="email">Name</label>
            <div className="error_msg">{nameErrorMsg}</div>
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
        </form>
        <label htmlFor="terms" className="conditions">
          <input type="checkbox" className="terms_conditions" onClick={buttonToggle} id="terms" /> I agree to Terms & Condition receiving marketing and promotional
          materials
        </label>
        <button disabled={btnBool} className="section2_btn1" id="submit" onClick={() => { submitHandler() }}>
          Register
        </button>
      </section>
    </div>
  );
};

export default RegisterPage;
