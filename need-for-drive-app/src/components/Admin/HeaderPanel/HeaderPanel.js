import React from 'react';
import "./headerPanel.css"
import icons from "../../../assets/admin-icons.svg";

const HeaderPanel = () => {
  return (<div className="header-panel">
    <div className="search-box">
      <svg width="15" height="14">
        <use xlinkHref={`${icons}#search`}/>
      </svg>
      <input type="search" placeholder="Поиск ..."></input>
    </div>
    <div className="notifications">
      <svg width="26" height="26">
        <use xlinkHref={`${icons}#notifications`}/>
      </svg>
    </div>
  </div>)
}

export default HeaderPanel;