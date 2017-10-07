import * as actions from '../actions/users';
import * as teamActions from '../actions/teams';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actions.RECEIVED_USER:
      return {
        ...state,
        [action.user.key]: {
          ...action.user,
        },
      };

    case teamActions.RECEIVED_TEAM:
      const added = action.team.users.reduce(
        (all, user) => { // eslint-disable-next-line no-param-reassign
          all[user.key] = {
            ...user,
          };
          return all;
        },
        {},
      );

      return {
        ...state,
        ...added,
      };

    default:
      return state;
  }
}
