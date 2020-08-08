import React from "react";
import "./orderInfo.css";

const OrderInfo = () => {
  return (
    <div className="order-info">
      <h1>Ваш заказ:</h1>
      <ul className="info">
        <li className="info__item">
          <h4>Пункт выдачи</h4>
          <span>Ульяновск, Нариманова 42</span>
        </li>
      </ul>
      <div className="price">
        <h3>Цена:</h3>
        <span>От 8000 до 12000 ₽</span>
      </div>
      <button className="button inactive">
        <span>Выбрать модель</span>
      </button>
    </div>
  );
};

export default OrderInfo;
