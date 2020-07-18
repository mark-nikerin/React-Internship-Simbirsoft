import React, { useState } from "react";
import "./hamburger.css";

const Hamburger = ({openMenu}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = (event) => {
    event.preventDefault();
    openMenu(!isOpen);
    setIsOpen(!isOpen); 
  };

  return (
    <button
      className={isOpen ?  "hamburger_is-open" : "hamburger"}
      onClick={(event) => onClick(event)}
    >
      <div className="hamburger__box">
        <div className="hamburger__inner"></div>
      </div>
    </button>
  );
};

export default Hamburger;
