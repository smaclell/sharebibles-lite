import { LOAD_SETTINGS } from '../actions/settings';

export default function reducer(state = {}, action) {
  if (action.type === LOAD_SETTINGS) {
    return {
      ...state,
      enableInvitations: !!action.settings.enableInvitations || false,
    };
  }
  return state;
}
