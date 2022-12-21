import React, { useState } from "react";

const OrderRow = ({ data }) => {
    const [rowData, setRowData] = useState(null);
    return (
        <table id="order-table">
            <thead>
                <tr>
                    <th>Order Id</th>
                    <th>Order Date and Time</th>
                    <th>Store Location</th>
                    <th>City</th>
                    <th>Store Phone</th>
                    <th>Total Items</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th> </th>
                    <th>View</th>
                </tr>
            </thead>
            {/* TODO --- dummy for now*/}
            <tbody>
                {/* {data ?
                    data.map(obj => (
                        <tr>
                            fetched data
                        </tr>
                    )) : <></>
                } */}
                <tr>
                    <td>RMD12</td>
                    <td>20 Dec 2022, 10:32</td>
                    <td>Delhi</td>
                    <td>Delhi</td>
                    <td>dummmy</td>
                    <td>dummmy</td>
                    <td>dummmy</td>
                    <td>dummmy</td>
                    <td>dummmy</td>
                    <td>dummmy</td>
                </tr>
                <tr>
                    <td>RMD13</td>
                    <td>20 Dec 2022, 11:05</td>
                    <td>Mumbai</td>
                    <td>dummy</td>
                    <td>dummmy</td>
                    <td>dummmy</td>
                    <td>dummmy</td>
                    <td>dummmy</td>
                    <td></td>
                    <td>dummmy</td>
                </tr>
            </tbody>
        </table>
    )
}

export default OrderRow;