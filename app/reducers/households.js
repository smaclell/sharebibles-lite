import household from './household';

const households = (state = [], action) => {
  switch (action.type) {
    case 'ADD_HOUSEHOLD':
      return [
        ...state,
        household(undefined, action),
      ];
    case 'UPDATE_HOUSEHOLD':
      return state.map(h =>
        household(h, action),
      );
    default:
      return state;
  }
};

export default households;
