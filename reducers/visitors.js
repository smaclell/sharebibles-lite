import { UPDATE_VISTORS } from '../actions/visitors';
import { SET_CURRENT_USER } from '../actions/user';
import { SIGN_OUT } from '../actions/authentication';

export default function reducer(state = [], action) {
  if (action.type === UPDATE_VISTORS) {
    return action.users;
  }

  if (action.type === SET_CURRENT_USER) {
    return [action.user.key];
  }

  if (action.type === SIGN_OUT) {
    return [];
  }

  return state;
}
