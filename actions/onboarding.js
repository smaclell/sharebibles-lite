import * as SecureStore from 'expo-secure-store';
import { STEPS, ORDERED_STEPS } from '../assets/constants/OnboardingSteps';

export const ONBOARDED = 'ONBOARDED';
export const ONBOARDING_STEP = 'ONBOARDING_STEP';

export const SET_STEP = 'SET_STEP';
export function setStep(step = STEPS.start) {
  return (dispatch) => {
    dispatch({
      type: SET_STEP,
      step,
    });
    return SecureStore.setItemAsync(ONBOARDING_STEP, ORDERED_STEPS[step]);
  };
}

export const SET_STATUS = 'SET_STATUS';
function setStatus(isOnboarded) {
  return {
    type: SET_STATUS,
    isOnboarded,
  };
}

export const SET_COMPLETED = 'SET_COMPLETED';
export function setCompleted(key, value = true) {
  return {
    type: SET_COMPLETED,
    key,
    value,
  };
}

export function setOnboardingStatus(status = true) {
  return async (dispatch) => {
    await SecureStore.setItemAsync(ONBOARDED, status.toString());
    if (!status) {
      await dispatch(setStep(STEPS.start));
    }

    dispatch(setStatus(status));
  };
}

export function restoreOnboardingStatus() {
  return async (dispatch) => {
    let isOnboarded = await SecureStore.getItemAsync(ONBOARDED);
    const step = (await SecureStore.getItemAsync(ONBOARDING_STEP)) || ORDERED_STEPS[STEPS.start];

    if (isOnboarded === null) {
      await SecureStore.setItemAsync(ONBOARDED, 'false');
    }
    isOnboarded = isOnboarded === 'true';
    dispatch(setStatus(isOnboarded));
    return dispatch(setStep(STEPS[step].index));
  };
}

export function stepAction() {
  return async (dispatch, getState) => {
    const state = getState();
    const {
      onboarding: { step },
    } = state;

    const options = {
      ...state.onboarding,
      regionKey: state.authentication.regionKey || null,
      setStep: (newStep) => dispatch(setStep(newStep)),
      setCompleted: (key, value) => dispatch(setCompleted(key, value)),
    };

    if (step < STEPS.end && STEPS[ORDERED_STEPS[step]].actionLogic) {
      await STEPS[ORDERED_STEPS[step]].actionLogic(options);
    }
  };
}
