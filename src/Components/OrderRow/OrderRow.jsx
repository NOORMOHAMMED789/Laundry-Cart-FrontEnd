import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../authOperations";
import AlertPopUp from "../AlertPopUp/AlertPopUp";
import style from "./OrderRow.module.css";

const URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const OrderRow = ({ data }) => {
    const navigate = useNavigate();
    const [alertPopUp, setAlertPopUp] = useState(false);
    data?.map(obj => {
        const date = new Date(obj.createdAt)
        return obj.createdAt = date.toLocaleString();
    });

    const handleCancel = (order_id) => {
        const token = getToken("token");
        fetch(`${URL}/api/v1/order/${order_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({ status: "Cancelled" })
        })
        .then((response) => {
            if (response.status === 403 || response.status === 401) return navigate("/");
                setAlertPopUp(true);
            });
    }

    const handleView = () => {

    }

    return (
        <>
        {alertPopUp ? <AlertPopUp /> : <></>}
        <table id="order-table" className={style.fontSize}>
            <thead>
                <tr style={{ position: "sticky", top: 0 }}>
                    <th className={style.cell}>Order Id</th>
                    <th className={style.cell}>Order Date</th>
                    <th className={style.cell}>Store Location</th>
                    <th className={style.cell}>City</th>
                    <th className={style.cell}>Store Phone</th>
                    <th className={style.cell}>Total Items</th>
                    <th className={style.cell}>Price</th>
                    <th className={style.cell}>Status</th>
                    <th className={style.cell}> </th>
                    <th className={style.cell}>View</th>
                </tr>
            </thead>
            <tbody>
                {data?.map(obj => (
                    <tr key={obj.orderId}>
                        <td>{obj.orderId}</td>
                        <td>{obj.createdAt}</td>
                        <td>{obj.storeLocation}</td>
                        <td>{obj.city}</td>
                        <td>{obj.storePhone}</td>
                        <td>{obj.totalItems}</td>
                        <td style={{ color: "#5861AE", fontWeight: "bold" }}>{obj.price}</td>
                        <td style={obj.status === "Cancelled"?{color: "red", fontWeight: "bold"}:{}}>{obj.status}</td>
                        <td><button className="btn-vt" style={button_style} onClick={() => handleCancel(obj.orderId)}>Cancel</button> </td>
                        <td><img src="/icons/view.png" alt="view" width="15vw" onClick={handleView} /></td>
                    </tr>
                ))
                }
            </tbody>
        </table>
        </>
    )
}

export default OrderRow;

const button_style = {
    color: "red",
    border: "none",
    background: "transparent"
}