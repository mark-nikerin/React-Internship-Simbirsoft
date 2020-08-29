export const ADD_INFO_ITEM = "ADD_INFO_ITEM";
export const REMOVE_INFO_ITEM = "REMOVE_INFO_ITEM";
export const RESET_INFO_ITEMS ="RESET_INFO_ITEMS";
export const SET_EXACT_FINAL_PRICE ="SET_EXACT_FINAL_PRICE";
export const SET_ESTIMATED_FINAL_PRICE ="SET_ESTIMATED_FINAL_PRICE";


export const addInfoItem = (info) => ({
  type: ADD_INFO_ITEM,
  payload: { title: info.title, value: info.value },
});

export const removeInfoItem = (title) => ({
  type: REMOVE_INFO_ITEM,
  payload: title,
});

export const setExactFinalPrice = (exactPrice) => ({
  type: SET_EXACT_FINAL_PRICE,
  payload: exactPrice,
});

export const setEstimatedFinalPrice = (estimatedPriceString) => ({
  type: SET_ESTIMATED_FINAL_PRICE,
  payload: estimatedPriceString,
});

export const resetInfoItems = () => ({
  type: RESET_INFO_ITEMS
});

