import * as actions from '../actions/users';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actions.RECEIVED_USER:
      return {
        ...state,
        [action.user.key]: {
          ...action.user,
        },
      };

    default:
      return state;
  }
}
