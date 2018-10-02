import { SET_STEP, SET_STATUS, SET_COMPLETED, COMPLETED_KEYS } from '../actions/onboarding';
import { STEPS } from '../assets/constants/OnboardingSteps';

const initial = {
  isOnboarded: true,
  step: STEPS.start,
  completed: {
    [COMPLETED_KEYS.hasAddedLocation]: false,
    [COMPLETED_KEYS.hasViewedPin]: false,
    [COMPLETED_KEYS.hasAcceptedInvite]: false,
  },
};

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

  if (action.type === SET_COMPLETED) {
    return {
      ...state,
      completed: {
        ...state.completed,
        [action.key]: action.value,
      },
    };
  }

  return state;
}
