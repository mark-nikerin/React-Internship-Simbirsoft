import React, { useEffect, useState } from "react";
import "../steps.css";
import "./carModelsStep.css";

const API_KEY = process.env.REACT_APP_API_KEY;
const PROXY_URL = process.env.REACT_APP_PROXY_URL;

const CarModelsStep = ({ props }) => {
  const checkedFilterId = props.fieldValues.modelFilter;
  const selectedCarId = props.fieldValues.selectedCar;

  const [categories, setCategories] = useState();
  const [cars, setCars] = useState();

  const onFilterCheck = (event, id) => {
    event.preventDefault();
    props.setField("modelFilter", id);
  };

  const onCarSelect = (event, id, model, minPrice, maxPrice) => {
    event.preventDefault();
    props.setField("selectedCar", id);
    props.addInfoItem({ title: "Модель", value: model });
    props.setEstimatedFinalPrice("От " + minPrice + " до " + maxPrice + " ₽");
  };

  const fetchCategories = async () => {
    const response = await fetch(
      PROXY_URL + "http://api-factory.simbirsoft1.com/api/db/category",
      {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Factory-Application-Id": API_KEY,
        },
      }
    );
    const categoryResponse = await response.json();
    const categories = categoryResponse.data.map((category) => {
      return category.name;
    });
    setCategories(["Все модели", ...categories]);
  };

  const fetchCars = async () => {
    const response = await fetch(
      PROXY_URL + "http://api-factory.simbirsoft1.com/api/db/car",
      {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Factory-Application-Id": API_KEY,
        },
      }
    );
    const carResponse = await response.json();
    const cars = carResponse.data.map((car) => {
      return {
        name: car.name,
        imgUrl: "http://api-factory.simbirsoft1.com" + car.thumbnail.path,
        priceMin: car.priceMin,
        priceMax: car.priceMax,
        number: car.number,
        colors: car.colors,
        tank: car.tank,
        category: car.categoryId.name,
      };
    });
    setCars(cars);
  };

  useEffect(() => {
    fetchCategories();
    fetchCars();
  }, []);

  return (
    <div className="step">
      <div className="filters">
        {categories &&
          categories.map((filter, id) => {
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
        {cars &&
          cars.map((car, id) => {
            return (
              <div
                className={
                  id === selectedCarId ? "cars__item selected" : "cars__item"
                }
                style={{
                  display:
                    checkedFilterId === 0 ||
                    categories[checkedFilterId] === car.category
                      ? "flex"
                      : "none",
                }}
                key={id}
                onClick={(event) =>
                  onCarSelect(event, id, car.name, car.priceMin, car.priceMax)
                }
              >
                <div className="title">
                  <h3>{car.name}</h3>
                  <span>{car.priceMin + " - " + car.priceMax + " ₽"}</span>
                </div>
                <img
                  crossOrigin="anonymous"
                  referrerPolicy="origin"
                  src={PROXY_URL + car.imgUrl}
                  alt={car.name}
                ></img>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CarModelsStep;
