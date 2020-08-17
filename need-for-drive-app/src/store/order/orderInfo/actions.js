export const ADD_INFO_ITEM = "ADD_INFO_ITEM";
export const REMOVE_INFO_ITEM = "REMOVE_INFO_ITEM";
export const RESET_INFO_ITEMS ="RESET_INFO_ITEMS"


export const addInfoItem = (info) => ({
  type: ADD_INFO_ITEM,
  payload: { title: info.title, value: info.value },
});

export const removeInfoItem = (title) => ({
  type: REMOVE_INFO_ITEM,
  payload: title,
});

export const resetInfoItems = () => ({
  type: RESET_INFO_ITEMS
});
