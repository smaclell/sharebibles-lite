import { combineReducers } from 'redux';
import * as actions from '../actions/visits';

function all(state = {}, action) {
  switch (action.type) {
    case actions.CREATE_VISIT:
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
    case actions.CREATE_VISIT:
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

export default combineReducers({ all, byLocation });
