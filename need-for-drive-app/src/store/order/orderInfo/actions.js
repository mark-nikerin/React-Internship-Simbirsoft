export const ADD_INFO_ITEM = "ADD_INFO_ITEM";
export const REMOVE_INFO_ITEM = "REMOVE_INFO_ITEM";

 
export const addInfoItem = (info) => ({
  type: ADD_INFO_ITEM,
  payload: { title: info.title, value: info.value },
});

export const removeInfoItem = (title) => ({
  type: REMOVE_INFO_ITEM,
  payload: title,
});
