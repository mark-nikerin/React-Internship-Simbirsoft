import { MOVE_TO_NEXT_STEP, MOVE_TO_PREV_STEP } from "./actions";

const defaultState = {
  currentStep: 1,
  filledSteps: [],
};

export const orderReducer = (state = defaultState, action) => {
  console.log(state);
  switch (action.type) {
    case MOVE_TO_NEXT_STEP: {
      const filled = state.filledSteps;
      filled.push(state.currentStep);
      const step = state.currentStep + 1;

      return {
        ...state,
        currentStep: step,
        filledSteps: filled
      };
    }
    case MOVE_TO_PREV_STEP:
      return {
        ...state,
        currentStep: action.payload,
      };

    default:
      return state;
  }
};
