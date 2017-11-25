import * as actions from '../actions/users';
import { SIGN_OUT } from '../actions/authentication';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actions.RECEIVED_USER:
      return {
        ...state,
        [action.user.key]: {
          ...action.user,
        },
      };
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
}
