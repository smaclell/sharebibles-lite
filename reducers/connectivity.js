import { SET_CONNECTED, SET_MODE } from '../actions/connectivity';

const initial = {
  connected: false,
  isOfflineOnly: false,
};

export default function reducer(state = initial, action) {
  if (action.type === SET_CONNECTED) {
    return {
      ...state,
      connected: action.connected,
    };
  }

  if (action.type === SET_MODE) {
    return {
      ...state,
      isOfflineOnly: action.isOfflineOnly,
    };
  }

  return state;
}
