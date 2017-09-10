import { combineReducers } from 'redux';
import * as actions from '../actions/visits';

function all(state = {}, action) {
  switch (action.type) {
    case actions.CREATE_VISIT:
      return {
        ...state,
        [action.visit.id]: {
          ...action.visit,
        },
      };
    default:
      return state;
  }
}

// TODO: should this whole thing just be a selector?
function byDistribution(state = {}, action) {
  switch (action.type) {
    case actions.CREATED_DISTRIBUTION:
      return {
        ...state,
        [action.visit.distributionId]: [ // TODO: Should these be sorted? Or is that in a selector
          ...state[action.visit.distributionId],
          action.visit.id,
        ],
      };
    default:
      return state;
  }
}

export default combineReducers({ all, byDistribution });
