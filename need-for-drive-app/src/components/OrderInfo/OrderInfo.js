import React from "react";
import "./orderInfo.css";

const buttonLabels = [
  "Выбрать модель",
  "Дополнительно",
  "Итого",
  "Заказать",
  "Заказать",
  "Отменить",
];

const OrderInfo = (props) => {
  const onButtonClick = (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    if (props.currentStep === 6) props.setStep(1);
    else {
      props.setNextStep();
    }
  };

  return (
    <div className="order-info">
      <h1>Ваш заказ:</h1>
      <ul className="info">
        {props.infoItems.map((infoItem, id) => {
          return (
            <li className="info__item" key={id}>
              <h4>{infoItem.title}</h4>
              <span>{infoItem.value}</span>
            </li>
          );
        })}
      </ul>
      <div className="price">
        <h3>Цена:</h3>
        <span>От 8000 до 12000 ₽</span>
      </div>
      <button
        className={props.currentStep === 6 ? "button red" : "button"}
        onClick={(event) => onButtonClick(event)}
      >
        <span>{buttonLabels[props.currentStep - 1]}</span>
      </button>
    </div>
  );
};

export default OrderInfo;
