import React from "react";
import style from "./OrderRow.module.css";

const OrderRow = ({ data }) => {
    data?.map(obj => {
        const date = new Date(obj.createdAt)
        return obj.createdAt = date.toLocaleString();
    });
    return (
        <table id="order-table" className={style.fontSize}>
            <thead>
                <tr style={{ position: "sticky", top: 0 }}>
                    <th className={style.cell}>Order Id</th>
                    <th className={style.cell}>Order Date and Time</th>
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
                        <td>{obj.status}</td>
                        <td><button className="btn-vt" style={{ color: "red", border: "none", background: "transparent" }}>Cancel</button> </td>
                        <td><img src="/icons/view.png" alt="view" width="15vw" /></td>
                    </tr>
                ))
                }
            </tbody>
        </table>
    )
}

export default OrderRow;