import { combineReducers } from 'redux';

// Sorted Alphabetically
import connectivity from './connectivity';
import locations from './locations';
import resources from './resources';
import statuses from './statuses';
import tags from './tags';
import teams from './teams';
import uploads from './uploads';
import user from './user';
import users from './users';
import visits from './visits';

// Sorted Alphabetically
const reducer = combineReducers({
  connected: connectivity,
  locations,
  resources,
  statuses,
  tags,
  teams,
  uploads,
  user,
  users,
  visits,
});

export default reducer;
