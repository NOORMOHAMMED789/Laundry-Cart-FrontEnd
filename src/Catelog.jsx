import React from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import Footer from "./Components/Footer3/Footer3";
import HomeHeader from "./Components/HomeHeader/HomeHeader";
import CatelogRow from "./Components/CatelogRow/CatelogRow";

export default function Catelog() {
  return (
    <>
      <HomeHeader />
      <Sidebar />
      <div
        className="catelog-container"
        style={{ height: "85vh", marginLeft: "4vw" }}
      >
        <div className="catelog-container-hero" style={{ height: "10vh" }}>
          <div style={{ position: "absolute", padding: "5vh 5vw" }}>
            Create Order
          </div>
          <div style={{ float: "right", margin: "5vh 5vw" }}>
            <div
              style={{
                display: "inline-block",
                borderBottom: "1px solid gray",
              }}
            >
              <img src="./icons/search.svg" alt="search" />
              <input type="text" style={{ border: "none" }} />
            </div>
          </div>
        </div>
        <div style={{ margin: "0 5vw" }}>
          <CatelogRow />
        </div>
      </div>
      <Footer />
    </>
  );
}
