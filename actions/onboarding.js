import { SecureStore } from 'expo';

const FIRST_STEP = 1;
export const ONBOARDED = 'ONBOARDED';
export const ONBOARDING_STEP = 'ONBOARDING_STEP';
export const COMPLETED_KEYS = Object.freeze({
  hasAddedLocation: 'hasAddedLocation',
  hasViewedPin: 'hasViewedPin',
  hasAcceptedInvite: 'hasAcceptedInvite',
});

export const SET_STEP = 'SET_STEP';
export function setStep(step) {
  SecureStore.setItemAsync(ONBOARDING_STEP, step.toString());
  return {
    type: SET_STEP,
    step,
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
    if (!status) dispatch(setStep(FIRST_STEP));
    dispatch(setStatus(status));
  };
}

export function restoreOnboardingStatus() {
  return async (dispatch) => {
    let isOnboarded = await SecureStore.getItemAsync(ONBOARDED);
    const step = await SecureStore.getItemAsync(ONBOARDING_STEP);
    if (isOnboarded === null) {
      await SecureStore.setItemAsync(ONBOARDED, 'false');
    }
    isOnboarded = (isOnboarded === 'true');
    dispatch(setStatus(isOnboarded));
    dispatch(setStep(parseInt(step, 10) || FIRST_STEP));
  };
}
