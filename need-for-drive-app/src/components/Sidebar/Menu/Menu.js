import React from 'react'
import "./menu.css"
import icons from "../../../assets/icons.svg"

const Menu = ({isMenuOpen}) => {
  console.log(isMenuOpen);
  return(
    <div className={isMenuOpen ? "menu" : "menu_hidden"}>
      <li className="menu__list">
        <ul>ПАРКОВКА</ul>
        <ul>СТРАХОВКА</ul>
        <ul>БЕНЗИН</ul>
        <ul>ОБСЛУЖИВАНИЕ</ul>
      </li>
      <div className="menu__social-icons">
          <svg className="menu__social-icon" width="18" height="20">
            <use xlinkHref={`${icons}#location`}></use>
          </svg>
          <svg className="menu__social-icon" width="18" height="20">
            <use xlinkHref={`${icons}#location`}></use>
          </svg>
          <svg className="menu__social-icon" width="18" height="20">
            <use xlinkHref={`${icons}#location`}></use>
          </svg>
      </div>
    </div>
  );
}

export default Menu;