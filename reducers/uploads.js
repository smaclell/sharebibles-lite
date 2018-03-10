import { UPLOAD_UPDATED } from '../actions/uploads';

export default function reducer(state = {}, action) {
  if (action.type === UPLOAD_UPDATED) {
    return {
      ...state,
      [action.key]: action.status,
    };
  }

  return state;
}
