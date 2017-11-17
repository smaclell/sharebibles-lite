import { SET_CONNECTED } from '../actions/connectivity';

export default function reducer(state = false, action) {
  if (action.type === SET_CONNECTED) {
    return action.connected;
  }

  return state;
}
