import React from "react";
import { Link } from "react-router-dom";
import "./main.css";
import icons from "../../assets/icons.svg";

const Main = () => {
  return (
    <div className="main">
      <div className="main__header">
        <h1 className="unselectable">Need for drive</h1>
        <div className="location">
          <svg className="location__icon" width="18" height="20">
            <use xlinkHref={`${icons}#location`}></use>
          </svg>
          <span>Ульяновск</span>
        </div>
      </div>
      <div className="main__content">
        <h1 className="unselectable">Каршеринг</h1>
        <h2 className="unselectable">Need for drive</h2>
        <h3 className="unselectable">Поминутная аренда авто твоего города</h3>
        <Link to="/React-Internship-Simbirsoft/order">
          <button className="button">
            <span>Забронировать</span>
          </button>
        </Link>
      </div>
      <div className="main__footer">
        <span>© 2016-2019 «Need for drive»</span>
        <a href="tel:84952342244">8 (495) 234-22-44</a>
      </div>
    </div>
  );
};

export default Main;
