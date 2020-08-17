import React from "react";
import "./confirmOrder.css";

const ConfirmOrder = (props) => {
  const onBack = (event) => { 
    event.preventDefault();
    props.setPrevStep();
  };

  const onConfirm = (event) => {
    event.preventDefault();
    props.setNextStep();
  };

  return (
    <div className="modal visible">
      <div className="confirm-order">
        <h2>Подтвердить заказ</h2>
        <div className="buttons">
          <button className="button" onClick={(event) => onConfirm(event)}>
            <span>Подтвердить</span>
          </button>
          <button className="button red" onClick={(event) => onBack(event)}>
            <span>Вернуться</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
