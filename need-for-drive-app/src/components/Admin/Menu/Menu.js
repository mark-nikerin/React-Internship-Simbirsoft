import React from "react";
import "./menu.css";
import icons from "../../../assets/admin-icons.svg";

const Menu = () => {
  return (
    <div className="admin-menu">
      <div className="admin-menu__logo">
        <a href="#/admin" className="logo__content">
          <svg width="22" height="22">
            <use xlinkHref={`${icons}#logo`} />
          </svg>
          <span>Need for drive</span>
        </a>
      </div>
      <div className="admin-menu__item active">
        <div className="item__content">
          <svg width="15" height="15">
            <use xlinkHref={`${icons}#edit`} />
          </svg>
          <span>Карточка автомобиля</span>
        </div>
      </div>
      <div className="admin-menu__item">
        <div className="item__content">
          <svg width="17" height="16">
            <use xlinkHref={`${icons}#list`} />
          </svg>
          <span>Список авто</span>
        </div>
      </div>
      <div className="admin-menu__item">
        <div className="item__content">
          <svg width="17" height="17">
            <use xlinkHref={`${icons}#orders`} />
          </svg>
          <span>Заказы</span>
        </div>
      </div>
      <div className="admin-menu__item">
        <div className="item__content">
          <svg width="17" height="18">
            <use xlinkHref={`${icons}#menu4`} />
          </svg>
          <span>Menu 4</span>
        </div>
      </div>
    </div>
  );
};

export default Menu;
