import {
  MOVE_TO_NEXT_STEP,
  MOVE_TO_PREV_STEP,
  MOVE_TO_STEP,
  SET_FIELD,
} from "./actions";
import _ from "lodash";

const defaultState = {
  currentStep: 1,
  filledSteps: [],
  fieldValues: [
    { field: "city", value: "" },
    { field: "point", value: "" },
    { field: "modelFilter", value: 0 },
    { field: "cars", value: null },
    { field: "colorFilter", value: 0 },
    { field: "dateStart", value: null },
    { field: "dateEnd", value: null },
    { field: "plan", value: 0 },
    { field: "additionals", value: [] },
  ],
};

export const stepsReducer = (state = defaultState, action) => {
  console.log(state);
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
      let newFieldValues = [...state.fieldValues];

      const existingFieldId = _.findIndex(newFieldValues, [
        "field",
        action.payload.field,
      ]);
      if (existingFieldId !== -1) {
        newFieldValues[existingFieldId].value = action.payload.value;
      } else {
        newFieldValues.push(action.payload);
      }
      return {
        ...state,
        fieldValues: newFieldValues,
      };
    }
    default:
      return state;
  }
};
