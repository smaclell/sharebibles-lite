import { RECIEVE_LOCATION } from '../actions/locations';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case RECIEVE_LOCATION:
      return {
        ...state,
        [action.location.key]: {
          ...action.location,
        },
      };
    default:
      return state;
  }
}
