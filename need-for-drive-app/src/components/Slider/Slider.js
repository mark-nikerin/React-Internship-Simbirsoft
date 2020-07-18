import React from "react";
import "./slider.css";
import icons from "../../assets/icons.svg";

const Slider = () => {
  return (
    <div className="slider">
      <button className="slider__arrow">
        <svg className="slider__arrow-icon" width="10" height="20">
          <use xlinkHref={`${icons}#arrow-left`}></use>
        </svg>
      </button>
      <div className="slider__content">
        <div className="slider__content_item">
          <h1>Бесплатная парковка</h1>
          <h3>Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.</h3>
          <button className="slider__button-1">
            <span>Подробнее</span>
          </button>
        </div>
        <div className="slider__dots">
          <div className="slider__dot_active"></div>
          <div className="slider__dot"></div>
          <div className="slider__dot"></div>
          <div className="slider__dot"></div>
        </div>
      </div>
      <button className="slider__arrow">
        <svg className="slider__arrow-icon" width="10" height="20" >
          <use xlinkHref={`${icons}#arrow-right`}></use>
        </svg>
      </button>
    </div>
  );
};

export default Slider;
