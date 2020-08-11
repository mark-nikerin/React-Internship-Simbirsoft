import React from "react";
import "./orderInfo.css";

const buttonLabels = ["Выбрать модель", "Дополнительно", "Итого", "Заказать"];

const OrderInfo = (props) => {
  const onButtonClick = (event) => {
    event.preventDefault();
    props.setNextStep();
  }

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
      <button className="button" onClick={(event) => onButtonClick(event)}>
        <span>{buttonLabels[props.currentStep-1]}</span>
      </button>
    </div>
  );
};

export default OrderInfo;
