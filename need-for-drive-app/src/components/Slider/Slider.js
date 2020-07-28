import React, { useState } from "react";
import "./slider.css";
import icons from "../../assets/icons.svg";
import slide1 from "../../assets/slides/1.png";
import slide2 from "../../assets/slides/2.png";
import slide3 from "../../assets/slides/3.png";
import slide4 from "../../assets/slides/4.png";

const slides = [
  {
    image: slide1,
    title: "Бесплатная парковка",
    text:
      "Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.",
  },
  {
    image: slide2,
    title: "Страховка",
    text: "Полная страховка страховка автомобиля.",
  },
  {
    image: slide3,
    title: "Бензин",
    text: "Полный бак на любой заправке города за наш счёт.",
  },
  {
    image: slide4,
    title: "Обслуживание",
    text: "Автомобиль проходит еженедельное ТО.",
  },
];

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slide, setSlide] = useState(slides[slideIndex]);

  const onDotClick = (event, index) => {
    event.preventDefault();
    setSlide(slides[index]);
    setSlideIndex(index);
  };

  const onNextArrowClick = (event) => {
    event.preventDefault(); 

    const index = slideIndex + 1 > slides.length - 1
      ? 0 
      : slideIndex + 1;

    setSlide(slides[index]);
    setSlideIndex(index);
  };

  const onPrevArrowClick = (event) => {
    event.preventDefault();

    const index = slideIndex - 1 < 0 
      ? slides.length - 1
      : slideIndex - 1;

    setSlide(slides[index]);
    setSlideIndex(index);
  };

  return (
    <div
      className="slider"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%), url(${slide.image})`,
      }}
    >
      <button
        className="slider__arrow"
        onClick={(event) => onPrevArrowClick(event)}
      >
        <svg className="slider__arrow-icon" width="10" height="20">
          <use xlinkHref={`${icons}#arrow-left`}></use>
        </svg>
      </button>
      <div className="slider__content">
        <div className="slider__content_item">
          <h1>{slide.title}</h1>
          <h3>{slide.text}</h3>
          <button className={`slider__button-${slideIndex}`}>
            <span>Подробнее</span>
          </button>
        </div>
        <div className="slider__dots">
          {slides.map((item, index) => {
            return index == slideIndex ? (
              <div className="slider__dot_active"></div>
            ) : (
              <div
                className="slider__dot"
                onClick={(event) => {
                  onDotClick(event, index);
                }}
              ></div>
            );
          })}
        </div>
      </div>
      <button
        className="slider__arrow"
        onClick={(event) => onNextArrowClick(event)}
      >
        <svg className="slider__arrow-icon" width="10" height="20">
          <use xlinkHref={`${icons}#arrow-right`}></use>
        </svg>
      </button>
    </div>
  );
};

export default Slider;
