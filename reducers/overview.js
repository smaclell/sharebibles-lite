import { UPDATE_OVERVIEW_MODE, USER_MODE } from '../actions/overview';

export default function reducer(state = { mode: USER_MODE }, action) {
  if (action.type === UPDATE_OVERVIEW_MODE) {
    return {
      mode: action.mode,
    };
  }

  return state;
}
