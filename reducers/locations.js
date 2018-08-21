import { RECIEVE_LOCATION, CLEAR_LOCATIONS } from '../actions/locations';

const initial = {};

export default function reducer(state = initial, action) {
  if (action.type === RECIEVE_LOCATION) {
    return {
      ...state,
      [action.location.key]: action.location,
    };
  }

  if (action.type === CLEAR_LOCATIONS) {
    return initial;
  }

  return state;
}
