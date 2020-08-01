import React from 'react';
import "./header.css"; 
import icons from "../../assets/icons.svg";

const Header = () => {
  return(
    <div className="header">
        <a href="/React-Internship-Simbirsoft">Need for drive</a>
        <div className="location">
          <svg className="location__icon" width="18" height="20">
            <use xlinkHref={`${icons}#location`}></use>
          </svg>
          <span><a href="https://yandex.ru/maps/?ll=48.482301,54.300849&z=12&l=map">Ульяновск</a></span>
        </div>
      </div>
  )
}

export default Header;