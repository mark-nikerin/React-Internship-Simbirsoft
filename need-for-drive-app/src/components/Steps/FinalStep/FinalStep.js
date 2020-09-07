import React, { useEffect } from "react";
import "./finalStep.css";
import "../steps.css";

const API_KEY = process.env.REACT_APP_API_KEY;
const PROXY_URL = process.env.REACT_APP_PROXY_URL;

const FinalStep = ({ props, orderId }) => {
  const selectedCar = props.fieldValues.selectedCar;
  const additionals = props.fieldValues.additionals;
  const setField = props.setField;
  const addInfoItem = props.addInfoItem;

  const setFieldValues = (order) => {
    const city = order.cityId;
    setField("city", { id: city.id, name: city.name });

    const point = order.pointId;
    setField("point", { id: point.id, name: point.name + " " + point.address });

    addInfoItem("Пункт выдачи", city.name + ", " + point.address);

    const car = order.carId;
    setField("selectedCar", {
      id: car.id,
      colors: car.colors,
      model: car.name,
      number: car.number,
      imgUrl: PROXY_URL + "http://api-factory.simbirsoft1.com" + car.thumbnail.path,
      tank: car.tank,
    });

    addInfoItem("Модель", car.name);

    setField("colorFilter", {
      id: null,
      name: order.color,
    });

    addInfoItem("Цвет", order.color);

    setField("dateStart", {
      formatted: new Date(order.dateFrom).toLocaleString(),
      timespan: order.dateFrom,
    });

    setField("dateEnd", {
      formatted: new Date(order.dateTo).toLocaleString(),
      timespan: order.dateTo,
    });

    const dateDiff = props.getDateDiff(new Date(order.dateFrom), new Date(order.dateTo));

    const days = dateDiff.days === 0 ? "" : dateDiff.days + "д ";
    const hours = dateDiff.hours === 0 ? "" : dateDiff.hours + "ч ";
    const minutes = dateDiff.minutes === 0 ? "" : dateDiff.minutes + "м ";

    props.addInfoItem("Длительность аренды", days + hours + minutes);

    const rate = order.rateId;
    setField("rate", {
      rateId: rate.id,
      price: rate.price,
      rateName: rate.rateTypeId.name,
    });

    addInfoItem("Тариф", rate.rateTypeId.name);

    additionals[0].isActive = order.isFullTank;
    additionals[1].isActive = order.isNeedChildChair;
    additionals[2].isActive = order.isRightWheel;
    setField("additionals", additionals);

    additionals.forEach((additional) => {
      if (additional.isActive)
        addInfoItem(additional.title, "Да");
    })
  };

  const fetchOrder = async (orderId) => {
    const response = await fetch(
      PROXY_URL + "http://api-factory.simbirsoft1.com/api/db/order/" + orderId,
      {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Factory-Application-Id": API_KEY,
        },
      }
    );
    const orderResponse = await response.json();

    console.log(orderResponse);
    setFieldValues(orderResponse.data);
  };

  useEffect(() => {
    console.log(orderId);
    if (orderId !== undefined) {
      fetchOrder(orderId);
    }
  }, []);

  return (
    <div className="step">
      <div className="selected-car">
        <div className="selected-car__info">
          <h1 className="info__title">{selectedCar.model}</h1>
          <div className="info__number">{selectedCar.number}</div>
          <div className="info__item">
            <h3>Топливо</h3>
            <span>{selectedCar.tank + " %"}</span>
          </div>
          <div className="info__item">
            <h3>Доступна с</h3>
            <span>{props.fieldValues.dateStart.formatted}</span>
          </div>
        </div>
        <img
          className="selected-car__image"
          crossOrigin="anonymous"
          referrerPolicy="origin"
          src={selectedCar.imgUrl}
          alt="car"
        ></img>
      </div>
    </div>
  );
};

export default FinalStep;
