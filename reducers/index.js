import { combineReducers } from 'redux';

// Sorted Alphabetically
import locations from './locations';
import resources from './resources';
import tags from './tags';
import teams from './teams';
import user from './user';
import users from './users';
import visits from './visits';

// Sorted Alphabetically
const reducer = combineReducers({
  locations,
  resources,
  tags,
  teams,
  user,
  users,
  visits,
});

export default reducer;
