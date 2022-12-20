import React from "react";
import { useState } from "react";
import Header from "./Components/Header/SigninHeader";
import Sidebar from "./Components/Sidebar/Sidebar";
import Footer from "./Components/Footer3/Footer3";
import HomeRow from "./Components/HomeRow/HomeRow";

export default function Home() {
    const [isFetched, setIsFetched] = useState(false)
    const [fetchedData, setFetchedData] = useState(null);

    return (
        <>
            < Header />
            < Sidebar />
            <div className="home-container" style={{ height: "85vh", marginLeft: "4vw" }}>
                <div className="home-container-hero" style={{ height: "10vh" }}>
                    <div htmlFor="order-count" style={count_style}>Orders | 0</div>
                    <div style={search_style}>
                        {isFetched ? <button style={button_style}>Create</button> : <></>}
                        <div style={{ display: "inline-block", borderBottom: '1px solid gray' }}>
                            <img src="./icons/search.svg" alt="search" />
                            <input type="text" style={{ border: "none" }} />
                        </div>
                    </div>
                </div>
                <div style={{ margin: "0 5vw" }}>
                    {isFetched ?
                        < HomeRow data={fetchedData}/>
                        :
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "60vh", flexDirection: "column"}}>
                            <p style={{color: "#222B45", opacity: "0.5"}}>No Orders available</p>
                            <button style={button_style}>Create</button>
                        </div>
                    }
                </div>
            </div>
            < Footer />
        </>
    )
}


const count_style = {
    position: "absolute",
    padding: '5vh 5vw'
}

const button_style = {
    color: "#5861ae",
    border: '1px solid #5861ae',
    borderRadius: 4,
    margin: "0 2vw",
    padding: ".2rem 2rem",
    background: "white"

}

const search_style = {
    float: 'right',
    margin: "5vh 5vw"
}