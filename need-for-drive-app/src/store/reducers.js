import { combineReducers } from "redux";
import { stepsReducer } from "./order/steps/reducers"
import { orderInfoReducer } from "./order/orderInfo/reducers"

export default combineReducers({ 
  steps: stepsReducer,
  orderInfo: orderInfoReducer
});