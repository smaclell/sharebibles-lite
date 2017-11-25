import { RECIEVE_LOCATION } from '../actions/locations';
import { SIGN_OUT } from '../actions/authentication';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case RECIEVE_LOCATION:
      return {
        ...state,
        [action.location.key]: {
          ...action.location,
        },
      };
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
}
