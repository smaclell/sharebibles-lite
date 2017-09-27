import * as actions from '../actions/distributions';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actions.CREATED_DISTRIBUTION:
      return {
        ...state,
        [action.distribution.id]: {
          ...action.distribution,
        },
      };
    default:
      return state;
  }
}
