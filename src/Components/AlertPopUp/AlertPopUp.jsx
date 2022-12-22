import React, { useState } from "react";
import "./AlertPopUp.css";
import danger from "./danger.PNG";

export default function AlertPopUp() {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Alert Confirm
      </button>

      {modal && (
        <div className="modal1">
          <div onClick={toggleModal} className="overlay1"></div>
          <div className="modal-content1">
            <h3 className="modal_title1">Alert</h3>

            <div className="button_body">
              <img src={danger} alt="danger" className="alert_img" />
              <p className="alert_para">
                Are you sure want to cancel the Order No:ORD1
              </p>
            </div>
            <button className="alert_btn" onClick={toggleModal}>
              Proceed
            </button>
          </div>
        </div>
      )}
    </>
  );
}
