import { SecureStore } from 'expo';

export const ONBOARDED = 'ONBOARDED';

export const SET_STEP = 'SET_STEP';
export function setStep(step) {
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

export function setOnboardingStatus(status = true) {
  return async (dispatch) => {
    await SecureStore.setItemAsync(ONBOARDED, status.toString());
    if (!status) dispatch(setStep(1));
    dispatch(setStatus(status));
  };
}

export function restoreOnboardingStatus() {
  return async (dispatch) => {
    let isOnboarded = await SecureStore.getItemAsync(ONBOARDED);
    if (isOnboarded === null) {
      await SecureStore.setItemAsync(ONBOARDED, 'false');
    }
    isOnboarded = (isOnboarded === 'true');
    dispatch(setStatus(isOnboarded));
  };
}
