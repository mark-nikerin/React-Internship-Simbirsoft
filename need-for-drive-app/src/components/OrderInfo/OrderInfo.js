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
    if (props.filledSteps.indexOf(props.currentStep) !== -1) {
      window.scrollTo(0, 0);
      if (props.currentStep === 6) {
        props.setStep(1);
        props.resetFields();
        props.resetInfoItems();
      } else {
        props.setNextStep();
      }
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
              <div className="dots"></div>
              <span>{infoItem.value}</span>
            </li>
          );
        })}
      </ul>
      <div
        className="price"
        style={{
          display:
            props.orderPrice.min === null &&
            props.orderPrice.final === null
              ? "none"
              : "flex",
        }}
      >
        <h3>Цена:</h3>
        <span>
          {props.currentStep < 3
            ? "От " + props.orderPrice.min + " до " + props.orderPrice.min + " ₽"
            : props.orderPrice.final + " ₽"}
        </span>
      </div>
      <button
        className={
          props.currentStep === 6
            ? "button red"
            : props.filledSteps.indexOf(props.currentStep) === -1
            ? "button inactive"
            : "button"
        }
        onClick={(event) => onButtonClick(event)}
      >
        <span>{buttonLabels[props.currentStep - 1]}</span>
      </button>
    </div>
  );
};

export default OrderInfo;
