import {
  MOVE_TO_NEXT_STEP,
  MOVE_TO_PREV_STEP,
  MOVE_TO_STEP,
  SET_FIELD,
  RESET_FIELDS,
} from "./actions";
import _ from "lodash";

const defaultState = {
  currentStep: 1,
  filledSteps: [4, 5, 6],
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

const shouldFillStep = (step, state) => {
  switch (step) {
    case 1: {
      return (
        _.find(state.fieldValues, { field: "city" }).value !== "" &&
        _.find(state.fieldValues, { field: "point" }).value !== ""
      );
    }
    case 2: {
      return _.find(state.fieldValues, { field: "cars" }).value !== null;
    }

    case 3: {
      return (
        _.find(state.fieldValues, { field: "dateStart" }).value !== null &&
        _.find(state.fieldValues, { field: "dateEnd" }).value !== null
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
      let newFieldValues = [...state.fieldValues];
      let newFilledSteps = [...state.filledSteps];

      const existingFieldId = _.findIndex(newFieldValues, [
        "field",
        action.payload.field,
      ]);
      if (existingFieldId !== -1) {
        newFieldValues[existingFieldId].value = action.payload.value;
      } else {
        newFieldValues.push(action.payload);
      }

      const index = newFilledSteps.indexOf(state.currentStep);

      if (shouldFillStep(state.currentStep, state) === true) {
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
      let newFieldValues = [
        { field: "city", value: "" },
        { field: "point", value: "" },
        { field: "modelFilter", value: 0 },
        { field: "cars", value: null },
        { field: "colorFilter", value: 0 },
        { field: "dateStart", value: null },
        { field: "dateEnd", value: null },
        { field: "plan", value: 0 },
        { field: "additionals", value: [] },
      ];
      return {
        ...state,
        fieldValues: newFieldValues,
        filledSteps: [1, 4, 5, 6],
      };
    }
    default:
      return state;
  }
};
