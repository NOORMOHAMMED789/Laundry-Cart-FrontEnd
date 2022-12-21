import React, { useState, useEffect } from "react";
const URL = process.env.REACT_APP_API_KEY || "http://localhost:3001"

const CatelogRow = () => {
    const [rowData, setRowData] = useState(null);
    const [quantity, setQuantity] = useState(""); // For realtime validation of quantity input
    const [totalCart, setTotalCart] = useState([]); // Cart which will store key as product id, value [quantity, price], services as boolean

    useEffect(() => {
        fetch(URL + '/api/v1/product').then((response) => response.json()).then(data => { setRowData(data.products); console.log(data) });
    }, [])

    // Handling and adding to cart the user services
    const handleService = (service) => {
        let arr = service.split("_");
        const id = parseInt(arr[1]);
        const serviceName = arr[0];

        // Restricting to select when quantity is empty
        const input = document.getElementById(id);
        if (input.value === 0 || input.value === "") return

        setTotalCart(prevState => {
            for (let i = 0; i < prevState.length; i++) {
                if (prevState[i].key === id) {
                    prevState[i][serviceName] = true;
                    break;
                }
            }
            return prevState;
        })

        switch (serviceName) {
            case "washing-machine":
                document.getElementById(service).src = '/icons/washing-machine -highlighted.svg';
                break;
            case "ironing":
                document.getElementById(service).src = '/icons/ironing -highlighted.svg';
                break;
            case "towel":
                document.getElementById(service).src = '/icons/towel -highlighted.svg';
                break;
            case "bleach":
                document.getElementById(service).src = '/icons/bleach -highlighted.svg';
                break;
            default: console.log("We are currently not offering this service")
        }
    }

    // Handling and validating the quantity input field
    const updateQuantity = (quantity, id, price) => {
        if (Number.isInteger(parseInt(quantity)) && parseInt(quantity) > 0) {
            setQuantity(quantity);
            document.getElementById(id).disabled = true;

            // Adding quantity and price with key as product id into the cart
            setTotalCart(prevState => [...prevState, { key: id, value: [parseInt(quantity), parseInt(price)] }]);
            document.getElementById(`calc-${id}`).innerHTML = `${quantity} x ${price} = <span style=color:#5861AE;font-size:20px>${quantity * price}</span>`;
            document.getElementById(`reset-btn-${id}`).style.display = 'block';

        }
        else {
            setQuantity(0);
            document.getElementById(id).value = 0;
        }
    }

    const handleReset = (id) => {

        // deleteing data from cart
        setTotalCart(prevState => prevState.filter((data) => (data.key === id) ? false : true));

        // resetting the UI
        document.getElementById(`washing-machine_${id}`).src = `/icons/washing-machine.svg`;
        document.getElementById(`ironing_${id}`).src = `/icons/ironing.svg`;
        document.getElementById(`towel_${id}`).src = `/icons/towel.svg`;
        document.getElementById(`bleach_${id}`).src = `/icons/bleach.svg`;
        document.getElementById(id).value = "";
        document.getElementById(id).disabled = false;
        document.getElementById(`reset-btn-${id}`).style.display = 'none';
        document.getElementById(`calc-${id}`).innerText = '__';
    }

    const handleSubmit = () => {
        const date = Date.now();
        const order_id = `ORLA${date}`;
        let total_items = 0;
        let total_price = 0;
        for (let i = 0; i < totalCart.length; i++) {
            const quantity = totalCart[i]["value"][0];
            total_items += quantity;
            total_price += totalCart[i]["value"][1] * quantity;
        }
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiemVlc2hhbjQwMDI5MTFAZ21haWwuY29tIiwiaWF0IjoxNjcxNjM0MjAxLCJleHAiOjE2NzE2Mzc4MDF9.HZAr9OmaZuCD8BiNfaNZGYemXUmgSw96q3rvv29vX7Y";

        fetch(URL + "/api/v1/order/", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": token
            },
            body: JSON.stringify({
                orderId: order_id,
                storeLocation: "JP Nagar",
                city: "Bangalore",
                storePhone: 9988667755,
                totalItems: total_items,
                price: total_price,
            })
        }).then(response => response.json())
        .then((data) => {
            (data.status === "Success") ? alert("Order placed Succefully") : alert("failed to placed the order");
            setTotalCart([]);
        })
    }

    return (
        <>
            <table id="catelog-table">
                <thead>
                    <tr>
                        <th style={{ padding: "0 .5rem", width: "25vw" }}>Product Types</th>
                        <th style={{ width: 10 }}>Quantity</th>
                        <th style={{ width: "30vw" }}>Wash Type</th>
                        <th style={{ width: "15vw", fontWeight: "bold" }}>Price</th>
                        <th style={{ width: "10vw" }}></th>
                    </tr>
                </thead>

                {/* List Rendering based on number of products */}
                <tbody>
                    {rowData ?
                        rowData.map(obj => (
                            <tr key={obj.id}>
                                <td>
                                    <img src={`${URL}/images/` + obj.filename} alt={obj.name} style={{ float: "left", padding: "0 .5rem" }} />
                                    <div style={{ display: "flex", flexDirection: "column", textAlign: "left", width: "20vw" }}>
                                        <div >{obj.name}</div>
                                        <div style={{ color: "#777" }}>{obj.description}</div>
                                    </div>
                                </td>
                                <td ><input type="text" id={obj.id} placeholder="0" style={{ width: 30, textAlign: "center" }} onBlur={(e) => updateQuantity(e.target.value, obj.id, obj.price)} /></td>
                                <td>
                                    <img className="pad" src="/icons/washing-machine.svg" id={`washing-machine_${obj.id}`} alt="washing-machine" onClick={() => handleService(`washing-machine_${obj.id}`)} />
                                    <img className="pad" src="/icons/ironing.svg" id={`ironing_${obj.id}`} alt="ironing" onClick={() => handleService(`ironing_${obj.id}`)} />
                                    <img className="pad" src="/icons/towel.svg" id={`towel_${obj.id}`} alt="towel" onClick={() => handleService(`towel_${obj.id}`)} />
                                    <img className="pad" src="/icons/bleach.svg" id={`bleach_${obj.id}`} alt="bleach" onClick={() => handleService(`bleach_${obj.id}`)} />
                                </td>
                                <td >
                                    <div id={`calc-${obj.id}`} style={{ color: "#777" }}>__</div>
                                </td>
                                <td >
                                    <button className="btn-vt" id={`reset-btn-${obj.id}`} style={{ display: "none" }} onClick={() => handleReset(obj.id)}>Reset</button>
                                </td>
                            </tr>
                        )) : <tr><td style={{ position: "absolute", left: "40vw", top: "40vh" }}>Our Server is Down Currently.... Visit Us Later</td></tr>
                    }
                </tbody>
            </table>
            {rowData ?
                <div style={{ float: "right", marginTop: "1rem" }}>
                    <button className="btn-vt">Cancel</button>
                    <button className="btn-vt-fill" onClick={() => handleSubmit()}>Proceed</button>
                </div>
                : <></>
            }
        </>
    )
}

export default CatelogRow;