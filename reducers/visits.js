import { combineReducers } from 'redux';
import { RECEIVE_VISIT } from '../actions/visits';
import uniq from 'lodash/uniq';

function all(state = {}, action) {
  switch (action.type) {
    case RECEIVE_VISIT:
      return {
        ...state,
        [action.visit.key]: {
          ...action.visit,
        },
      };
    default:
      return state;
  }
}

// TODO: should this whole thing just be a selector?
function byLocation(state = {}, action) {
  switch (action.type) {
    case RECEIVE_VISIT:
      return {
        ...state,
        [action.visit.locationKey]: [ // TODO: Should these be sorted? Or is that in a selector
          ...(state[action.visit.locationKey] || []),
          action.visit.key,
        ],
      };
    default:
      return state;
  }
}

function byUser(state = {}, action) {
  switch (action.type) {
    case RECEIVE_VISIT:
      const users = {};
      Object.keys(action.visit.visitors).forEach((userKey) => {
        const previous = state[userKey] || [];
        users[userKey] = [...previous, action.visit.key];
      });

      Object.keys(users).forEach((userKey) => {
        users[userKey] = uniq(users[userKey]);
      });

      return {
        ...state,
        ...users,
      };
    default:
      return state;
  }
}

export default combineReducers({ all, byLocation, byUser });
