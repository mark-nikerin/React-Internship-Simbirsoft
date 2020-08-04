import React from "react";
import "./stepsMenu.css";

const StepsMenu = () => {
  return(
    <ul className="steps-menu">
      <li className="current">Местоположение</li>
      <li>Модель</li>
      <li>Дополнительно</li>
      <li>Итого</li>
    </ul>
  ) 
}

export default StepsMenu;