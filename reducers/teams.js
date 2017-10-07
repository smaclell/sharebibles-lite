import * as actions from '../actions/teams';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actions.RECEIVED_TEAM:
      return {
        ...state,
        [action.team.key]: {
          ...action.team,
          user: action.team.users.map(u => u.key),
        },
      };
    default:
      return state;
  }
}
