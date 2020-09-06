import {
  MOVE_TO_NEXT_STEP,
  MOVE_TO_PREV_STEP,
  MOVE_TO_STEP,
  SET_FIELD,
  RESET_FIELDS,
} from "./actions";

const defaultState = {
  currentStep: 1,
  filledSteps: [4, 5, 6],
  fieldValues: {
    city: { id: null, name: ""},
    point: { id: null, name: ""},
    modelFilter: 0,
    selectedCar: { id: null, model: null, number: null, colors: null, imgUrl: null,  tank: null },
    colorFilter: { id: 0, name: ""},
    dateStart: { formatted: null, timespan: 0},
    dateEnd: { formatted: null, timespan: 0},
    rate: { id: 0, rateId: ""},
    additionals: [
      { title: "Полный бак", systemName:"isFullTank" , isActive: false, price: 200, unit: "₽"},
      { title: "Детское кресло", systemName:"isNeedChildChair" , isActive: false, price: 200, unit: "₽"},
      { title: "Правый руль", systemName:"isRightWheel" , isActive: false, price: 1600, unit: "₽"},
    ],
  },
};

const shouldFillStep = (step, fieldValues) => {
  switch (step) {
    case 1: {
      return fieldValues.city.name !== "" && fieldValues.point.name !== "";
    }
    case 2: {
      return fieldValues.selectedCar.id !== null;
    }
    case 3: {
      return fieldValues.dateStart.formatted !== null && fieldValues.dateEnd.formatted !== null;
    }
    default:
      return true;
  }
};

export const stepsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MOVE_TO_NEXT_STEP: {
      const step = state.currentStep + 1;
      return {
        ...state,
        currentStep: step,
      };
    };
    case MOVE_TO_STEP:
      return {
        ...state,
        currentStep: action.payload,
      };
    case MOVE_TO_PREV_STEP:
      const step = state.currentStep - 1;
      return {
        ...state,
        currentStep: step,
      };
    case SET_FIELD: {
      let newFieldValues = { ...state.fieldValues };
      let newFilledSteps = [...state.filledSteps];

      const field = action.payload.field;

      newFieldValues[field] = action.payload.value;

      const index = newFilledSteps.indexOf(state.currentStep);

      if (shouldFillStep(state.currentStep, newFieldValues) === true) {
        if (index === -1) {
          newFilledSteps.push(state.currentStep);
        }
      }

      return {
        ...state,
        fieldValues: newFieldValues,
        filledSteps: newFilledSteps,
      };
    };
    case RESET_FIELDS: {
      return {
        ...state,
        fieldValues: { ...defaultState.fieldValues },
        filledSteps: [...defaultState.filledSteps],
      };
    }
    default:
      return state;
  }
};
