import { UPDATE_ALLOW_DOWNLOAD } from '../actions/permissions';

const initial = { allowDownload: false };

export default function reducer(state = initial, action) {
  if (action.type === UPDATE_ALLOW_DOWNLOAD) {
    return {
      ...state,
      allowDownload: action.value,
    };
  }

  return state;
}
