import React, { useEffect } from "react";
import "./finalStep.css";
import "../steps.css";

const API_KEY = process.env.REACT_APP_API_KEY;
const PROXY_URL = process.env.REACT_APP_PROXY_URL;

const FinalStep = ({ props, orderId }) => {
  const selectedCar = props.fieldValues.selectedCar;
  const additionals = props.fieldValues.additionals;
  const addInfoItem = props.addInfoItem;

  const [finalOrderInfo, setFinalOrderInfo] = React.useState({
    model: selectedCar.model,
    number: selectedCar.number,
    tank: selectedCar.tank,
    imgUrl: selectedCar.imgUrl,
    date: new Date(props.fieldValues.dateStart.timespan).toLocaleString(),
  });

  const fillOrderInfo = (order) => {
    const city = order.cityId;
    const point = order.pointId;
    const car = order.carId;
    const rate = order.rateId;

    additionals[0].isActive = order.isFullTank;
    additionals[1].isActive = order.isNeedChildChair;
    additionals[2].isActive = order.isRightWheel;

    const dateDiff = props.getDateDiff(
      new Date(order.dateFrom),
      new Date(order.dateTo)
    );

    const days = dateDiff.days === 0 ? "" : dateDiff.days + "д ";
    const hours = dateDiff.hours === 0 ? "" : dateDiff.hours + "ч ";
    const minutes = dateDiff.minutes === 0 ? "" : dateDiff.minutes + "м ";

    const price = props.getOrderPrice(
      rate.rateTypeId.unit,
      rate.price,
      dateDiff,
      car.priceMin,
      additionals
    );

    props.setOrderPrice({ ...props.orderPrice, final: price });

    addInfoItem("Пункт выдачи", city.name + ", " + point.address);
    addInfoItem("Модель", car.name);
    addInfoItem("Цвет", order.color);
    addInfoItem("Длительность аренды", days + hours + minutes);
    addInfoItem("Тариф", rate.rateTypeId.name);
    additionals.forEach((additional) => {
      if (additional.isActive) addInfoItem(additional.title, "Да");
    });

    setFinalOrderInfo({
      model: car.name,
      number: car.number,
      tank: car.tank,
      imgUrl: PROXY_URL + "http://api-factory.simbirsoft1.com" + car.thumbnail.path,
      date: new Date(order.dateFrom).toLocaleString()
    });
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

    fillOrderInfo(orderResponse.data);
  };

  useEffect(() => {
    if (orderId !== undefined) {
      fetchOrder(orderId);
    }
  }, []);

  return (
    <div className="step">
      <div className="selected-car">
        <div className="selected-car__info">
          <h1 className="info__title">{finalOrderInfo.model}</h1>
          <div className="info__number">{finalOrderInfo.number}</div>
          <div className="info__item">
            <h3>Топливо</h3>
            <span>{finalOrderInfo.tank + " %"}</span>
          </div>
          <div className="info__item">
            <h3>Доступна с</h3>
            <span>{finalOrderInfo.date}</span>
          </div>
        </div>
        <img
          className="selected-car__image"
          crossOrigin="anonymous"
          referrerPolicy="origin"
          src={finalOrderInfo.imgUrl}
          alt="car"
        ></img>
      </div>
    </div>
  );
};

export default FinalStep;
