export const ADD_INFO_ITEM = "ADD_INFO_ITEM";
export const REMOVE_INFO_ITEM = "REMOVE_INFO_ITEM";
export const RESET_INFO_ITEMS = "RESET_INFO_ITEMS";
export const SET_ORDER_PRICE = "SET_ORDER_PRICE";


export const addInfoItem = (title, value) => ({
  type: ADD_INFO_ITEM,
  payload: { title: title, value: value },
});

export const removeInfoItem = (title) => ({
  type: REMOVE_INFO_ITEM,
  payload: title,
});

export const setOrderPrice = (orderPrice) => ({
  type: SET_ORDER_PRICE,
  payload: orderPrice,
});

export const resetInfoItems = () => ({
  type: RESET_INFO_ITEMS
});

