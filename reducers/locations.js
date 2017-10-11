import * as actions from '../actions/locations';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actions.CREATED_LOCATION:
      return {
        ...state,
        [action.location.key]: {
          ...action.location,
        },
      };
    default:
      return state;
  }
}
