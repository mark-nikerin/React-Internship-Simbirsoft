import { ADD_INFO_ITEM, REMOVE_INFO_ITEM } from "./actions";
import _ from "lodash";

const defaultState = {
  infoItems: [
    {
      title: "title",
      value: "value",
    },
    {
      title: "12",
      value: "22",
    },
  ],
};

export const orderInfoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_INFO_ITEM: {
      let newItems = [...state.infoItems]; 
      const existingItemId = _.findIndex(newItems, [
        "title",
        action.payload.title,
      ]); 
      if (existingItemId !== -1) {
        newItems[existingItemId].value = action.payload.value;
      } else {
        newItems.push(action.payload);
      }
      return {
        ...state,
        infoItems: newItems,
      };
    }
    case REMOVE_INFO_ITEM: {
      let newItems = [...state.infoItems]; 
      const existingItemId = _.findIndex(newItems, ["title", action.payload]);
      if (existingItemId !== -1) {
        newItems.splice(existingItemId, 1);
      }
      return {
        ...state,
        infoItems: newItems,
      };
    }
    default:
      return state;
  }
};
