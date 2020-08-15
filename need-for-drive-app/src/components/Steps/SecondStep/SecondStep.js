import React from "react";
import "../steps.css";
import "./secondStep.css";
import firstCar from "../../../assets/cars/1.png";
import secondCar from "../../../assets/cars/2.png";
import thirdCar from "../../../assets/cars/3.png";
import fourthCar from "../../../assets/cars/4.png";
import fifthCar from "../../../assets/cars/5.png";
import sixthCar from "../../../assets/cars/6.png";
import _ from "lodash";

const filters = ["Все модели", "Эконом", "Премиум"];
const cars = [
  {
    model: "ELANTRA",
    price: "12 000 - 25 000 ₽",
    img: `${firstCar}`,
  },
  {
    model: "i30 N",
    price: "10 000 - 32 000 ₽",
    img: `${secondCar}`,
  },
  {
    model: "CRETA",
    price: "12 000 - 25 000 ₽",
    img: `${thirdCar}`,
  },
  {
    model: "SONATA",
    price: "10 000 - 32 000 ₽",
    img: `${fourthCar}`,
  },
  {
    model: "i30 N",
    price: "10 000 - 32 000 ₽",
    img: `${fifthCar}`,
  },
  {
    model: "SONATA",
    price: "10 000 - 32 000 ₽",
    img: `${sixthCar}`,
  },
];

const SecondStep = (props) => {
  const checkedFilterId = _.find(props.fieldValues, { field: "modelFilter" })
    .value;
  const selectedCarId = _.find(props.fieldValues, { field: "cars" }).value;

  const onFilterCheck = (event, id) => {
    event.preventDefault();
    props.setField("modelFilter", id);
  };

  const onCarSelect = (event, id, model) => {
    event.preventDefault();
    props.setField("cars", id);
    props.addInfoItem({ title: "Модель", value: model });
  };

  return (
    <div className="step">
      <div className="filters">
        {filters.map((filter, id) => {
          if (id === checkedFilterId) {
            return (
              <label
                className="checked"
                key={id}
                onClick={(event) => onFilterCheck(event, id)}
              >
                <input type="radio" defaultChecked={true}></input>
                {filter}
              </label>
            );
          } else {
            return (
              <label key={id} onClick={(event) => onFilterCheck(event, id)}>
                <input type="radio"></input>
                {filter}
              </label>
            );
          }
        })}
      </div>
      <div className="cars">
        {cars.map((car, id) => {
          return (
            <div
              className={
                id === selectedCarId ? "cars__item selected" : "cars__item"
              }
              key={id}
              onClick={(event) => onCarSelect(event, id, car.model)}
            >
              <div className="title">
                <h3>{car.model}</h3>
                <span>{car.price}</span>
              </div>
              <img src={car.img} alt={car.model}></img>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SecondStep;
