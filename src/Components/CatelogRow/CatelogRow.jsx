import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../authOperations";
import styles from "./summary.module.css";
import PopModal from "../PopModal/PopModal";
const URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const CatelogRow = () => {
  const navigate = useNavigate();
  const [rowData, setRowData] = useState(null);
  const [quantity, setQuantity] = useState(""); // For realtime validation of quantity input
  const [totalCart, setTotalCart] = useState([]);
  const [summaryOn, setSummaryOn] = useState(false);
  const [openPop, setOpenPop] = useState(false);

  useEffect(() => {
    const token = getToken("token");
    console.log(token);
    fetch(URL + "/api/v1/product", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.status === 403) return navigate("/");
        return response.json();
      })
      .then((data) => {
        setRowData(data.products);
        console.log(data);
      });
  }, []);

  // Handling and adding to cart the user services
  const handleService = (service) => {
    let arr = service.split("_");
    const id = arr[1];
    const serviceName = arr[0];

    // Restricting to select when quantity is empty
    const input = document.getElementById(`key_${id}`);
    if (input.value === 0 || input.value === "") return;

    setTotalCart((prevState) => {
      for (let i = 0; i < prevState.length; i++) {
        if (prevState[i].key === `key_${id}`) {
          prevState[i][serviceName] = true;
          break;
        }
      }
      return prevState;
    });

    switch (serviceName) {
      case "washing-machine":
        document.getElementById(service).src =
          "/icons/washing-machine -highlighted.svg";
        break;
      case "ironing":
        document.getElementById(service).src =
          "/icons/ironing -highlighted.svg";
        break;
      case "towel":
        document.getElementById(service).src = "/icons/towel -highlighted.svg";
        break;
      case "bleach":
        document.getElementById(service).src = "/icons/bleach -highlighted.svg";
        break;
      default:
        console.log("We are currently not offering this service");
    }
  };

  // Handling and validating the quantity input field
  const updateQuantity = (quantity, id, price, name) => {
    if (Number.isInteger(parseInt(quantity)) && parseInt(quantity) > 0) {
      setQuantity(quantity);
      document.getElementById(`key_${id}`).disabled = true;

      // Adding quantity and price with key as product id into the cart
      setTotalCart((prevState) => [
        ...prevState,
        {
          key: `key_${id}`,
          name,
          value: [
            parseInt(quantity),
            parseInt(price),
            parseInt(quantity) * parseInt(price),
          ],
        },
      ]);
      document.getElementById(
        `calc-${id}`
      ).innerHTML = `${quantity} x ${price} = <span style=color:#5861AE;font-size:20px>${quantity * price
      }</span>`;
      document.getElementById(`reset-btn-${id}`).style.display = "block";
    } else {
      setQuantity(0);
      document.getElementById(`key_${id}`).value = 0;
    }
  };

  const handleReset = (id) => {
    // deleteing data from cart
    setTotalCart((prevState) =>
      prevState.filter((data) => (data.key === `key_${id}` ? false : true))
    );

    // resetting the UI
    document.getElementById(
      `washing-machine_${id}`
    ).src = `/icons/washing-machine.svg`;
    document.getElementById(`ironing_${id}`).src = `/icons/ironing.svg`;
    document.getElementById(`towel_${id}`).src = `/icons/towel.svg`;
    document.getElementById(`bleach_${id}`).src = `/icons/bleach.svg`;
    document.getElementById(`key_${id}`).value = "";
    document.getElementById(`key_${id}`).disabled = false;
    document.getElementById(`reset-btn-${id}`).style.display = "none";
    document.getElementById(`calc-${id}`).innerText = "__";
  };

  const handleSubmit = (arg) => {
    if (arg === "proceed") {
      return setSummaryOn(true);
    }
    let total_items = 0;
    let total_price = 0;
    for (let i = 0; i < totalCart.length; i++) {
      const quantity = totalCart[i]["value"][0];
      total_items += quantity;
      total_price += totalCart[i]["value"][1] * quantity;
    }
    if (arg === "total") { return total_price }
    total_price += 90; // Delivery Charges
    const date = Date.now();
    const order_id = `ORLA${date}`;
    const storeLocation =
      document.getElementById("storeLocation").value || "JP Nagar";
    const storePhone = document.getElementById("storePhone").value || 9988776655;

    const token = getToken("token");
    console.log(token);
    fetch(URL + "/api/v1/order/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        orderId: order_id,
        storeLocation: storeLocation,
        city: "Bangalore",
        storePhone: storePhone,
        totalItems: total_items,
        price: total_price,
        cart: totalCart
      }),
    })
      .then((response) => {
        if (response.status === 403) return navigate("/");
        return response.json();
      })
      .then((data) => {
        if (data.status === "Success") {
          setSummaryOn(false);
          setOpenPop(true);
        } else alert("failed to placed the order");
        setTotalCart([]);
        // navigate("/home");
      });
  };

  const getService = (key) => {
    let serviceStr = "";
    for (let i = 0; i < totalCart.length; i++) {
      if (totalCart[i].key === key) {
        if (totalCart[i].hasOwnProperty("washing-machine")) serviceStr += "Washing, ";
        if (totalCart[i].hasOwnProperty("ironing")) serviceStr += "Ironing, ";
        if (totalCart[i].hasOwnProperty("towel")) serviceStr += "Dry Wash, ";
        if (totalCart[i].hasOwnProperty("bleach")) serviceStr += "Chemical Wash";
        return serviceStr;
      }
    }
  }

  return (
    <>
      {openPop ? <PopModal setOpenPop={setOpenPop} /> : <></>}
      {summaryOn ? (
        <div id="summary">
          <div className={styles.heading}>Summary</div>
          <div className={styles.subheading}>
            <div className={styles.inline_hd}>
              Store Location:{" "}
              <input
                id="storeLocation"
                defaultValue="Jp Nagar"
                type="text"
                placeholder="__"
                className={styles.block_input}
                required
              />
            </div>
            <div className={styles.inline_hd}>
              Store Address:{" "}
              <input
                id="storeAddress"
                defaultValue="Near Phone booth, 10th road,"
                type="text"
                placeholder="__"
                className={styles.block_input}
                required
              />
            </div>
            <div className={styles.inline_hd}>
              Phone:{" "}
              <input
                type="tel"
                defaultValue="9999999999"
                id="storePhone"
                placeholder="__"
                className={styles.block_input}
                required
              />
            </div>
          </div>
          <p style={{ color: "#3B3737", paddingLeft: "1rem" }}>Order Details</p>
          <ol className={styles.list_style}>
            {totalCart.map((data) => (
              <li key={data.key} className={styles.bottom_border}>
                <span className={styles.inline_hd} style={{ width: "5vw" }}>{data.name}</span>
                <span className={styles.inline_hd} style={{ width: "20vw" }}>{getService(data.key)}</span>
                <span className={styles.inline_hd} style={{ width: "10vw" }}>
                  {data.value[0]} x {data.value[1]} ={" "}
                  <span style={{ color: "#5861AE", fontSize: "1.3rem" }}>
                    {" "}
                    {data.value[2]}
                  </span>
                </span>
              </li>
            ))}
            <li className={styles.total_block} >Sub Total: &nbsp;&nbsp;{handleSubmit("total")}</li>
            <li className={styles.total_block}>Pickup Charges: 90</li>
            <li className={styles.total_block} style={{background: "#5861AE", color: "white", width: "35vw", textAlign: "right"}}>Total: <span style={{fontSize: "1.8rem"}}>{parseInt(handleSubmit("total")) + 90}</span></li>
            <li className={styles.address}>Address
              <div className={styles.homeAddress}>
                <div><img src="/icons/tick.svg" style={{float: "right"}} alt="tick"/></div>
                <div style={{fontWeight: "bold"}}>Home</div>
                <div style={{color: "#777"}}>#223, 10th road, JP Nagar, Bangalore</div>
              </div>
            </li>
            <li className={styles.corner} style={{border: "none"}}>
            <button
              className="btn-vt-fill"
              onClick={() => handleSubmit("confirm")}>Confirm
            </button>
            </li>
          </ol>
        </div>
      ) : (
        <></>
      )}
      <table id="catelog-table" className={summaryOn ? "blur" : ""}>
        <thead style={{ position: "sticky", top: 0 }}>
          <tr>
            <th style={{ padding: "0 .5rem", width: "25vw" }}>Product Types</th>
            <th style={{ width: 10 }}>Quantity</th>
            <th style={{ width: "30vw" }}>Wash Type</th>
            <th style={{ width: "15vw", fontWeight: "bold" }}>Price</th>
            <th style={{ width: "10vw" }}></th>
          </tr>
        </thead>

        {/* List Rendering based on number of products */}
        <tbody >
          {rowData ? (
            rowData.map((obj) => (
              <tr key={obj.id}>
                <td>
                  <img
                    src={`${URL}/images/` + obj.filename}
                    alt={obj.name}
                    style={{ float: "left", padding: "0 .5rem" }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "left",
                      width: "20vw",
                    }}
                  >
                    <div>{obj.name}</div>
                    <div style={{ color: "#777" }}>{obj.description}</div>
                  </div>
                </td>
                <td>
                  <input
                    type="text"
                    id={`key_${obj.id}`}
                    placeholder="0"
                    style={{ width: 30, textAlign: "center" }}
                    onBlur={(e) =>
                      updateQuantity(
                        e.target.value,
                        obj.id,
                        obj.price,
                        obj.name
                      )
                    }
                  />
                </td>
                <td>
                  <img
                    className="pad"
                    src="/icons/washing-machine.svg"
                    id={`washing-machine_${obj.id}`}
                    alt="washing-machine"
                    onClick={() => handleService(`washing-machine_${obj.id}`)}
                  />
                  <img
                    className="pad"
                    src="/icons/ironing.svg"
                    id={`ironing_${obj.id}`}
                    alt="ironing"
                    onClick={() => handleService(`ironing_${obj.id}`)}
                  />
                  <img
                    className="pad"
                    src="/icons/towel.svg"
                    id={`towel_${obj.id}`}
                    alt="towel"
                    onClick={() => handleService(`towel_${obj.id}`)}
                  />
                  <img
                    className="pad"
                    src="/icons/bleach.svg"
                    id={`bleach_${obj.id}`}
                    alt="bleach"
                    onClick={() => handleService(`bleach_${obj.id}`)}
                  />
                </td>
                <td>
                  <div id={`calc-${obj.id}`} style={{ color: "#777" }}>
                    __
                  </div>
                </td>
                <td>
                  <button
                    className="btn-vt"
                    id={`reset-btn-${obj.id}`}
                    style={{ display: "none" }}
                    onClick={() => handleReset(obj.id)}
                  >
                    Reset
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={{ position: "absolute", left: "40vw", top: "40vh" }}>
                Requesting for Services from Our server......
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {rowData ? (
        <div style={{ float: "right", marginTop: "1rem" }}>
          <button className="btn-vt">Cancel</button>
          <button
            className="btn-vt-fill"
            onClick={() => handleSubmit("proceed")}
          >
            Proceed
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CatelogRow;
