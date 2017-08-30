import { combineReducers } from 'redux';

import user from './user';
import team from './team';
import households from './households';

const reducer = combineReducers({
  user,
  team,
  households,
});

export default reducer;
