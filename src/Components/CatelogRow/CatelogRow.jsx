import React, { useState, useEffect } from "react";
const URL = process.env.REACT_APP_API_KEY || "http://localhost:3001"

const CatelogRow = () => {
    const [rowData, setRowData] = useState(null);
    const [quantity, setQuantity] = useState("");
    const [totalCart, setTotalCart] = useState([]);
    useEffect(() => {
        fetch(URL + '/api/v1/product').then((response) => response.json()).then(data => { setRowData(data.products); console.log(data) });
    }, [])
    const handleService = (service) => {
        let arr = service.split("_");
        console.log(arr[0])
        switch (arr[0]) {
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
        }
    }

    const updateQuantity = (quantity, id, price) => {
        if (Number.isInteger(parseInt(quantity)) && parseInt(quantity) > 0) {
            setQuantity(quantity);
            document.getElementById(id).disabled = true;
            setTotalCart(prevState => [...prevState, { key: id, value: [parseInt(quantity), parseInt(price)] }]);
            document.getElementById(`calc-${id}`).innerHTML = `${quantity} x ${price} = <span style=color:#5861AE;font-size:20px>${quantity * price}</span>`;
            document.getElementById(`reset-btn-${id}`).innerHTML = `<button class="btn-vt">Reset</button>`;

        }
        else {
            setQuantity(0);
            document.getElementById(id).value = 0;
        }
    }
    return (
        <table id="catelog-table">
            <thead>
                <tr>
                    <th>Product Types</th>
                    <th>Quantity</th>
                    <th>Wash Type</th>
                    <th>Price</th>
                    <th></th>
                </tr>
            </thead>
            {/* List Rendering based on number of products */}
            <tbody>
                {rowData ?
                    rowData.map(obj => (
                        <tr key={obj.id}>
                            <td style={{ padding: "0 .5rem", width: "25vw" }}>
                                <img src={`${URL}/images/` + obj.filename} alt={obj.name} style={{ float: "left", padding: "0 .5rem" }} />
                                <div style={{ display: "flex", flexDirection: "column", textAlign: "left", width: "20vw" }}>
                                    <div >{obj.name}</div>
                                    <div style={{ color: "#777" }}>{obj.description}</div>
                                </div>
                            </td>
                            <td style={{ width: 10 }}><input type="text" id={obj.id} placeholder="0" style={{ width: 30, textAlign: "center" }} onBlur={(e) => updateQuantity(e.target.value, obj.id, obj.price)} /></td>
                            <td style={{ width: "30vw" }}>
                                <img className="pad" src="/icons/washing-machine.svg" id={`washing-machine_${obj.id}`} alt="washing-machine" onClick={() => handleService(`washing-machine_${obj.id}`)} />
                                <img className="pad" src="/icons/ironing.svg" id={`ironing_${obj.id}`} alt="ironing" onClick={() => handleService(`ironing_${obj.id}`)} />
                                <img className="pad" src="/icons/towel.svg" id={`towel_${obj.id}`} alt="towel" onClick={() => handleService(`towel_${obj.id}`)} />
                                <img className="pad" src="/icons/bleach.svg" id={`bleach_${obj.id}`} alt="bleach" onClick={() => handleService(`bleach_${obj.id}`)} />
                            </td>
                            <td style={{ width: "15vw", fontWeight: "bold" }}>
                                <div id={`calc-${obj.id}`} style={{color: "#777"}}>__</div>
                            </td>
                            <td id={`reset-btn-${obj.id}`}></td>
                        </tr>
                    )) : <tr><td>Our Server is Down Currently.... Come Back Later</td></tr>
                }
            </tbody>
        </table>
    )
}

export default CatelogRow;