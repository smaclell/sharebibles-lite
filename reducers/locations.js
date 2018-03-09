import { RECIEVE_LOCATION } from '../actions/locations';

export default function reducer(state = {}, action) {
  if (action.type === RECIEVE_LOCATION) {
    return {
      ...state,
      [action.location.key]: action.location,
    };
  }

  return state;
}
