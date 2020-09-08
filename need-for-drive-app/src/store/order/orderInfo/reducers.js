import {
  ADD_INFO_ITEM,
  REMOVE_INFO_ITEM,
  RESET_INFO_ITEMS,
  SET_ORDER_PRICE
} from "./actions";

const defaultState = {
  infoItems: [],
  orderPrice: {
    min: null,
    max: null,
    final: null
  }
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
    case SET_ORDER_PRICE: {
      return {
        ...state,
        orderPrice: action.payload
      };
    }
    case RESET_INFO_ITEMS: {
      return {
        ...state,
        infoItems: [...defaultState.infoItems],
        orderPrice: { ...defaultState.orderPrice },
      };
    }
    default:
      return state;
  }
};
