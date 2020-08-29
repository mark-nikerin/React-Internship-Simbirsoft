import React, { useEffect, useState } from "react";
import "../steps.css";
import "./carModelsStep.css";

const API_KEY = process.env.REACT_APP_API_KEY;
const PROXY_URL = process.env.REACT_APP_PROXY_URL;

const cache = { categories: null, cars: null };

const CarModelsStep = ({ props }) => {
  const checkedFilterId = props.fieldValues.modelFilter;
  const selectedCarId = props.fieldValues.selectedCar.id;

  const [categories, setCategories] = useState();
  const [cars, setCars] = useState();

  const onFilterCheck = (event, id) => {
    event.preventDefault();
    props.setField("modelFilter", id);
  };

  const onCarSelect = (event, id, model, minPrice, maxPrice, colors) => {
    event.preventDefault();
    props.setField("selectedCar", { id: id, colors: colors });
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
    const categories = [
      "Все модели",
      ...categoryResponse.data.map((category) => {
        return category.name;
      }),
    ];
    setCategories(categories);
    cache["categories"] = categories;
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
        id: car.id,
        name: car.name,
        imgUrl: PROXY_URL + "http://api-factory.simbirsoft1.com" + car.thumbnail.path,
        priceMin: car.priceMin,
        priceMax: car.priceMax,
        number: car.number,
        colors: car.colors,
        category: car.categoryId.name,
      };
    });
    setCars(cars);
    cache["cars"] = cars;
  };

  useEffect(() => {
    if (cache["categories"] === null) {
      fetchCategories();
    } else {
      setCategories(cache["categories"]);
    }

    if (cache["cars"] === null) {
      fetchCars();
    } else {
      setCars(cache["cars"]);
    }
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
          categories &&
          cars.map((car, id) => {
            return (
              <div
                className={
                  car.id === selectedCarId ? "cars__item selected" : "cars__item"
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
                  onCarSelect(
                    event,
                    car.id,
                    car.name,
                    car.priceMin,
                    car.priceMax,
                    car.colors
                  )
                }
              >
                <div className="title">
                  <h3>{car.name}</h3>
                  <span>{car.priceMin + " - " + car.priceMax + " ₽"}</span>
                </div>
                <img
                  crossOrigin="anonymous"
                  referrerPolicy="origin"
                  src={car.imgUrl}
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
