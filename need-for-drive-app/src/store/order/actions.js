export const MOVE_TO_NEXT_STEP = 'MOVE_TO_NEXT_STEP';
export const MOVE_TO_PREV_STEP = 'MOVE_TO_PREV_STEP';

export const setNextStep = () => ({
  type:MOVE_TO_NEXT_STEP
});

export const setPrevStep = (step) => ({
  type:MOVE_TO_PREV_STEP,
  payload: step
});