import * as actions from '../actions/user';
import { SIGN_OUT } from '../actions/authentication';

export default function reducer(state = null, action) {
  switch (action.type) {
    case actions.SET_CURRENT_USER:
      return action.user.key;
    case SIGN_OUT:
      return null;
    default:
      return state;
  }
}
