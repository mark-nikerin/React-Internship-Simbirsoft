import React from "react";
import "./stepsMenu.css";

const StepsMenu = () => {
  return (
    <React.Fragment>
      <ul className="steps-menu">
        <li className="current">Местоположение</li>
        <li>Модель</li>
        <li>Дополнительно</li>
        <li>Итого</li>
      </ul>
      <span className="menu-order-number">Заказ номер RU58491823</span>
    </React.Fragment>
  );
};

export default StepsMenu;
