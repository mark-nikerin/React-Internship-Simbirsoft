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
    city: "",
    point: "",
    modelFilter: 0,
    selectedCar: null,
    colorFilter: 0,
    dateStart: null,
    dateEnd: null,
    plan: 0,
    additionals: [],
  },
};

const shouldFillStep = (step, fieldValues) => {
  switch (step) {
    case 1: {
      return fieldValues.city !== "" && fieldValues.point !== "";
    }
    case 2: {
      return fieldValues.selectedCar !== null;
    }
    case 3: {
      return (
        fieldValues.dateStart !== null &&
        fieldValues.dateEnd !== null
      );
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
    }
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
      let newFieldValues = {...state.fieldValues};
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
    }
    case RESET_FIELDS: {
      return {
        ...state,
        fieldValues: {...defaultState.fieldValues},
        filledSteps: [...defaultState.filledSteps],
      };
    }
    default:
      return state;
  }
};
