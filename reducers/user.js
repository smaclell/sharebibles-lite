import * as actions from '../actions/user';

export default function reducer(state = null, action) {
  switch (action.type) {
    case actions.SET_CURRENT_USER:
      return action.user.id;
    default:
      return state;
  }
}
