import { ACCEPTED } from '../actions/authentication';

export default (state = {}, action) => {
  if (action.type === ACCEPTED) {
    return {
      regionKey: action.regionKey,
      teamKey: action.teamKey,
    };
  }

  return state;
};
