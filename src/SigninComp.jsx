import React from "react";
import Footer1 from "./Components/Footer1/Footer1";
import Footer2 from "./Components/Footer2/Footer2";
import Footer3 from "./Components/Footer3/Footer3";
import SigninHeader from "./Components/Header/SigninHeader";
import SignupPage from "./Components/SignupPage/SignupPage";
const SigninComp = () => {
  return (
    <div>
      <SigninHeader />
      <SignupPage />
      <Footer1 />
      <Footer2 />
      <Footer3 />
    </div>
  );
};

export default SigninComp;
