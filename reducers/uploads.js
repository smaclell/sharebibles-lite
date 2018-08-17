import { UPLOAD_UPDATED, UPLOADING_STATUS } from '../actions/uploads';

export default function reducer(state = { uploading: false }, action) {
  if (action.type === UPLOAD_UPDATED) {
    return {
      ...state,
      [action.key]: action.status,
    };
  } else if (action.type === UPLOADING_STATUS) {
    return {
      ...state,
      uploading: action.status,
    };
  }

  return state;
}
