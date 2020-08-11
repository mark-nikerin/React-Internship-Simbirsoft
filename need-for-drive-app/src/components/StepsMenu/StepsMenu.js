import React from "react";
import "./stepsMenu.css";

const menuItems = ["Местоположение", "Модель", "Дополнительно", "Итого"];

const StepsMenu = (props) => {
  console.log(props);

  const onMenuClick = (event, id) => {
    event.preventDefault();
    props.setStep(id);
  };

  return (
    <React.Fragment>
      {props.currentStep === 6 ? (
        <span className="menu-order-number">Заказ номер RU58491823</span>
      ) : (
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
            return <li>{menuItem}</li>;
          })}
        </ul>
      )}
    </React.Fragment>
  );
};

export default StepsMenu;
