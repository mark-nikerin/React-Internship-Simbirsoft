import React from "react";
import "./button.css";

const Button = (props) => {
  return(<button style={props.style} className="adminButton" onClick={props.onClick}>
    {props.text}
  </button>);
}

export default Button;
