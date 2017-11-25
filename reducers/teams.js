import * as actions from '../actions/teams';
import { SIGN_OUT } from '../actions/authentication';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actions.RECEIVED_TEAM:
      return {
        ...state,
        [action.team.key]: {
          ...action.team,
        },
      };
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
}
