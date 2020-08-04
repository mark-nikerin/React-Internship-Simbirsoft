import React from "react";
import "./confirmOrder.css";

const ConfirmOrder = () => {
  return (
    <div className="modal">
      <div className="confirm-order">
        <h2>Подтвердить заказ</h2>
        <div>
          <button className="button"><span>Подтвердить</span></button>
          <button className="button red"><span>Вернуться</span></button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
