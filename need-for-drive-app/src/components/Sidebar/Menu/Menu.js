import React from "react";
import "./menu.css";
import icons from "../../../assets/icons.svg";

const Menu = ({ isMenuOpen }) => { 
  return (
    <>
      <div className={isMenuOpen ? "menu" : "menu_hidden"}>
        <li className="menu__list">
          <ul>ПАРКОВКА</ul>
          <ul>СТРАХОВКА</ul>
          <ul>БЕНЗИН</ul>
          <ul>ОБСЛУЖИВАНИЕ</ul>
        </li>
        <div className="menu__social-icons">
          <svg className="menu__social-icon" width="32" height="32">
            <use xlinkHref={`${icons}#telegram`}></use>
          </svg>
          <svg className="menu__social-icon" width="32" height="32">
            <use xlinkHref={`${icons}#facebook`}></use>
          </svg>
          <svg className="menu__social-icon" width="32" height="32">
            <use xlinkHref={`${icons}#instagram`}></use>
          </svg>
        </div>
      </div>
      <div
        className={isMenuOpen ? "transparent-menu" : "transparent-menu_hidden"}
      ></div>
    </>
  );
};

export default Menu;
