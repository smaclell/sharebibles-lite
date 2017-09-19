import { combineReducers } from 'redux';

import distributions from './distributions';
import resources from './resources';
import teams from './teams';
import user from './user';
import users from './users';
import visits from './visits';

const reducer = combineReducers({
  distributions,
  teams,
  user,
  users,
  visits,
});

export default reducer;
