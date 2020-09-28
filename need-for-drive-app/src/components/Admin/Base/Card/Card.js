import React from "react";
import "./card.css";

const Card = (props) => {
  const style = props.style;

  return <div style={style} className="card">{props.children}</div>;
};

export default Card;
