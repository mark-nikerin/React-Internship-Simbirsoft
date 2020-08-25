import { ADD_INFO_ITEM, REMOVE_INFO_ITEM, RESET_INFO_ITEMS } from "./actions";

const defaultState = {
  infoItems: [],
};

export const orderInfoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_INFO_ITEM: {
      let newItems = [...state.infoItems];
      const existingItemId = newItems.findIndex(
        (item) => item.title === action.payload.title
      );

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
      const existingItemId = newItems.findIndex(
        (item) => item.title === action.payload
      );
      if (existingItemId !== -1) {
        newItems.splice(existingItemId, 1);
      }
      return {
        ...state,
        infoItems: newItems,
      };
    }
    case RESET_INFO_ITEMS: {
      const newItems = [];
      return {
        ...state,
        infoItems: newItems,
      };
    }
    default:
      return state;
  }
};
