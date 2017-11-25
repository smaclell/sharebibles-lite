import { UPLOAD_UPDATED } from '../actions/uploads';
import { SIGN_OUT } from '../actions/authentication';

export default function reducer(state = {}, action) {
  if (action.type === SIGN_OUT) {
    return {};
  }

  if (action.type === UPLOAD_UPDATED) {
    return {
      ...state,
      [action.key]: action.status,
    };
  }

  return state;
}
