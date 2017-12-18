import { combineReducers } from 'redux';
import { RECIEVE_LOCATION } from '../actions/locations';
import { RECEIVE_VISIT } from '../actions/visits';
import { SIGN_OUT } from '../actions/authentication';

const initial = {};

function all(state = initial, action) {
  if (action.type === RECIEVE_LOCATION) {
    return {
      ...state,
      [action.location.key]: action.location,
    };
  }

  if (action.type === SIGN_OUT) {
    return initial;
  }

  return state;
}

function byTeam(state = initial, action) {
  if (action.type === RECIEVE_LOCATION) {
    if (action.teamKey !== action.location.teamKey) {
      return state;
    }

    return {
      ...state,
      [action.location.key]: action.location.key,
    };
  }

  if (action.type === SIGN_OUT) {
    return initial;
  }

  return state;
}

function byUser(state = initial, action) {
  if (action.type === RECEIVE_VISIT) {
    const { userKey, visit: { locationKey, createdBy, visitors } } = action;

    const created = userKey === createdBy;
    const visited = visitors && visitors[userKey];

    if (!(created || visited)) {
      return state;
    }

    return {
      ...state,
      [locationKey]: locationKey,
    };
  }

  if (action.type === SIGN_OUT) {
    return initial;
  }

  return state;
}

export default combineReducers({
  all,
  byTeam,
  byUser,
});
