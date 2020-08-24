import React from "react";
import "./header.css";
import icons from "../../assets/icons.svg";

const Header = () => {
  return (
    <div className="header">
      <a href="/React-Internship-Simbirsoft">Need for drive</a>
      <div className="location">
        <svg className="location__icon" width="18" height="20">
          <use xlinkHref={`${icons}#location`}/>
        </svg>
        <span>
            Ульяновск
        </span>
      </div>
    </div>
  );
};

export default Header;
