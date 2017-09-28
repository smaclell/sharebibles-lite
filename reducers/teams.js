import * as actions from '../actions/teams';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actions.RECEIVED_TEAM:
      return {
        ...state,
        [action.team.id]: {
          ...action.team,
          user: action.team.users.map(u => u.id),
        },
      };
    default:
      return state;
  }
}
