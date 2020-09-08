import React from "react";
import { Redirect } from "react-router-dom";
import "./confirmOrder.css";

const API_KEY = process.env.REACT_APP_API_KEY;
const PROXY_URL = process.env.REACT_APP_PROXY_URL;

const ConfirmOrder = (props) => {
  const order = props.order;
  const price = order.price;

  const [orderId, setOrderId] = React.useState(null);

  const postOrder = async () => {
    const response = await fetch(
      PROXY_URL + "http://api-factory.simbirsoft1.com/api/db/order",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Api-Factory-Application-Id": API_KEY,
        },
        body: JSON.stringify({
          cityId: { id: order.city.id, name: order.city.name },
          pointId: { id: order.point.id, name: order.point.name },
          carId: { id: order.selectedCar.id },
          color: order.colorFilter.name,
          dateFrom: order.dateStart.timespan,
          dateTo: order.dateEnd.timespan,
          rateId: { id: order.rate.rateId },
          price: price,
          isFullTank: order.additionals[0].isActive,
          isNeedChildChair: order.additionals[1].isActive,
          isRightWheel: order.additionals[2].isActive,
        }),
      }
    );

    props.resetFields();

    const orderResponse = await response.json();

    setOrderId(orderResponse.data.id);
  };

  const onBack = (event) => {
    event.preventDefault();
    props.setPrevStep();
  };

  const onConfirm = async (event) => {
    event.preventDefault();
    await postOrder();
    props.setNextStep();
  };

  return orderId === null || orderId === undefined ? (
    <div className="modal visible">
      <div className="confirm-order">
        <h2>Подтвердить заказ</h2>
        <div className="buttons">
          <button className="button" onClick={(event) => onConfirm(event)}>
            <span>Подтвердить</span>
          </button>
          <button className="button red" onClick={(event) => onBack(event)}>
            <span>Вернуться</span>
          </button>
        </div>
      </div>
    </div>
  ) : <Redirect to={"/order/" + orderId} />;
};

export default ConfirmOrder;
