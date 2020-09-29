import React from "react";
import "./input.css";

const Input = (props) => {
  const header = props.header;
  const placeholder = props.placeholder;

  return (
    <div className="input">
      <span>{header}</span>
      <input type="text" placeholder={placeholder}/>
    </div>
  );
};

export default Input;
