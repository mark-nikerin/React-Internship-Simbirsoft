import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import "./main.css";

const Main = () => {
  return (
    <div className="main">
      <Header />
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
