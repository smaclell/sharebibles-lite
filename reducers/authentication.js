import { ACCEPTED } from '../actions/authentication';

export default (state = { regionKey: 'test-region' }, action) => {
  if (action.type === ACCEPTED) {
    return {
      regionKey: action.regionKey,
      teamKey: action.teamKey,
    };
  }

  return state;
};
