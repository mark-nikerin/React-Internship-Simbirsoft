import React from "react";
import { Link } from "react-router-dom";
import "./header.css";
import icons from "../../assets/icons.svg";

const Header = () => {
  return (
    <div className="header">
      <Link to="/"> Need for drive </Link>
      <div className="location">
        <svg className="location__icon" width="18" height="20">
          <use xlinkHref={`${icons}#location`} />
        </svg>
        <span>Ульяновск</span>
      </div>
    </div>
  );
};

export default Header;
