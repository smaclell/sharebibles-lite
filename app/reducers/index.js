import { combineReducers } from 'redux';

import distributions from './distributions';
import tags from './tags';
import teams from './teams';
import user from './user';
import users from './users';
import visits from './visits';

const reducer = combineReducers({
  distributions,
  tags,
  teams,
  user,
  users,
  visits,
});

export default reducer;
