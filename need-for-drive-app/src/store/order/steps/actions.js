export const MOVE_TO_NEXT_STEP = "MOVE_TO_NEXT_STEP";
export const MOVE_TO_PREV_STEP = "MOVE_TO_PREV_STEP";
export const MOVE_TO_STEP = "MOVE_TO_STEP";
export const SET_FIELD = "SET_FIELD";
export const RESET_FIELDS = "RESET_FIELDS";

export const setNextStep = () => ({
  type: MOVE_TO_NEXT_STEP,
});

export const setPrevStep = () => ({
  type: MOVE_TO_PREV_STEP,
});

export const setStep = (step) => ({
  type: MOVE_TO_STEP,
  payload: step,
});

export const setField = (field, value) => ({
  type: SET_FIELD,
  payload: { field: field, value: value },
});

export const resetFields = () => ({
  type: RESET_FIELDS,
});
