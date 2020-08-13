import { MOVE_TO_NEXT_STEP, MOVE_TO_PREV_STEP, MOVE_TO_STEP } from "./actions";

const defaultState = {
  currentStep: 1,
  filledSteps: [],
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

    default:
      return state;
  }
};
