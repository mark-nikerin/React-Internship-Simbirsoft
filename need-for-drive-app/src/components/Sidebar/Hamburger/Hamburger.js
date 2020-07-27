import React from "react";
import "./hamburger.css";

const Hamburger = ({openMenu, isMenuOpen}) => { 

  const onClick = (event) => {
    event.preventDefault();
    openMenu(!isMenuOpen); 
  };

  return (
    <button
      className={isMenuOpen ?  "hamburger_is-open" : "hamburger"}
      onClick={(event) => onClick(event)}
    >
      <div className="hamburger__box">
        <div className="hamburger__inner"></div>
      </div>
    </button>
  );
};

export default Hamburger;
