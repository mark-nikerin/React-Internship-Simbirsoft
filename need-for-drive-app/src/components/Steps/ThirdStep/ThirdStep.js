import React from "react";
import "../step.css";
import "./thirdStep.css";

const ThirdStep = () => {
  return (
    <div className="step">
      <h3 className="step__title">Цвет</h3>
      <div className="filters">
        <label>
          <input type="radio" name="color"></input>Любой
        </label>
        <label>
          <input type="radio" name="color"></input>Красный
        </label>
        <label className="checked">
          <input type="radio" name="color" defaultChecked="true"></input>
          Голубой
        </label>
      </div>
      <h3 className="step__title">Дата аренды</h3>
      <div className="search">
        <div className="search__item">
          <h3>C</h3>
          <input
            type="text"
            placeholder="Введите дату и время"
            onFocus={(event) => {
              event.preventDefault();
              event.target.type = "date";
            }}
            onBlur={(event) => {
              event.preventDefault();
              event.target.type = "text";
            }}
          ></input>
        </div>
        <div className="search__item">
          <h3>По</h3>
          <input
            type="text"
            placeholder="Введите дату и время"
            onFocus={(event) => {
              event.preventDefault();
              event.target.type = "date";
            }}
            onBlur={(event) => {
              event.preventDefault();
              event.target.type = "text";
            }}
          ></input>
        </div>
      </div>
      <h3 className="step__title">Тариф</h3>
      <div className="filters vertical">
        <label>
          <input type="radio" name="plan"></input>Любой
        </label>
        <label>
          <input type="radio" name="plan"></input>Красный
        </label>
        <label className="checked">
          <input type="radio" name="plan" defaultChecked="true"></input>
          Голубой
        </label>
      </div>
      <h3 className="step__title">Доп. услуги</h3>
      <div className="filters vertical">
        <label>
          <input type="checkbox" name="add"></input>Полный бак, 500р
        </label>
        <label>
          <input type="checkbox" name="add"></input>Детское кресло, 200р
        </label>
        <label className="checked">
          <input type="checkbox" name="add" defaultChecked="true"></input>
          Правый руль, 1600р
        </label>
      </div>
    </div>
  );
};

export default ThirdStep;
