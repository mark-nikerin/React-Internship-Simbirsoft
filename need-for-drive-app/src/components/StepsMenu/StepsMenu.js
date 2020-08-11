import React from "react";
import "./stepsMenu.css";

const menuItems = ["Местоположение", "Модель", "Дополнительно", "Итого"];

const StepsMenu = (props) => {
  console.log(props);

  const onMenuClick = (event, id) => {
    event.preventDefault();
    props.setPrevStep(id);
  };

  return (
    <React.Fragment>
      <ul className="steps-menu">
        {menuItems.map((menuItem, id) => {
          if (id === props.currentStep - 1)
            return <li className="current">{menuItem}</li>;
          if (id < props.currentStep - 1)
            return (
              <li
                className="active"
                onClick={(event) => onMenuClick(event, id + 1)}
              >
                {menuItem}
              </li>
            );
          return (
            <li onClick={(event) => onMenuClick(event, id + 1)}>{menuItem}</li>
          );
        })}
      </ul>
      <span className="menu-order-number">Заказ номер RU58491823</span>
    </React.Fragment>
  );
};

export default StepsMenu;
