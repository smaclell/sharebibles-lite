import { RECIEVE_LOCATION, REMOVE_LOCATION, CLEAR_LOCATIONS } from '../actions/locations';

const initial = {};

export default function reducer(state = initial, action) {
  if (action.type === RECIEVE_LOCATION) {
    return {
      ...state,
      [action.location.key]: action.location,
    };
  }

  if (action.type === REMOVE_LOCATION) {
    return {
      ...state,
      [action.locationKey]: undefined,
    };
  }

  if (action.type === CLEAR_LOCATIONS) {
    return initial;
  }

  return state;
}
