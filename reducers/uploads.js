import { UPLOAD_UPDATED, UPLOADING_STATUS } from '../actions/uploads';

export default function reducer(state = { uploading: false }, action) {
  if (action.type === UPLOAD_UPDATED) {
    return {
      ...state,
      [action.key]: {
        status: action.status,
        error: action.err,
      },
    };
  }

  if (action.type === UPLOADING_STATUS) {
    return {
      ...state,
      uploading: action.status,
    };
  }

  return state;
}
