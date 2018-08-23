import { SET_STEP, SET_STATUS } from '../actions/onboarding';

const initial = { isOnboarded: true, step: 1 };

export default function reducer(state = initial, action) {
  if (action.type === SET_STEP) {
    return {
      ...state,
      step: action.step,
    };
  }

  if (action.type === SET_STATUS) {
    return {
      ...state,
      isOnboarded: action.isOnboarded,
    };
  }

  return state;
}
