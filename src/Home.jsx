import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Components/Header/SigninHeader";
import Sidebar from "./Components/Sidebar/Sidebar";
import Footer from "./Components/Footer3/Footer3";
import OrderRow from "./Components/OrderRow/OrderRow";

export default function Home() {
    const navigate = useNavigate();
    const [fetchedData, setFetchedData] = useState(null);

    const handleCreateClick = () => {
        navigate("/catelog");
    }

    return (
        <>
            < Header />
            < Sidebar />
            <div className="home-container" style={{ height: "85vh", marginLeft: "4vw" }}>
                <div className="home-container-hero" style={{ height: "10vh" }}>
                    <div htmlFor="order-count" style={count_style}>Orders | 0</div>
                    <div style={search_style}>
                        {fetchedData ? <button className="btn-vt" onClick={() => handleCreateClick()}>Create</button>
                            : <></>}
                        <div style={{ display: "inline-block", borderBottom: '1px solid gray' }}>
                            <img src="./icons/search.svg" alt="search" />
                            <input type="text" style={{ border: "none" }} />
                        </div>
                    </div>
                </div>
                <div style={{ margin: "0 5vw" }}>
                    {fetchedData ?
                        < OrderRow data={fetchedData} />
                        :
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "60vh", flexDirection: "column" }}>
                            <p style={{ color: "#222B45", opacity: "0.5" }}>No Orders available</p>
                            <button className="btn-vt" onClick={() => handleCreateClick()}>Create</button>
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

const search_style = {
    float: 'right',
    margin: "5vh 5vw"
}