import { combineReducers } from 'redux';

// Sorted Alphabetically
import connectivity from './connectivity';
import locations from './locations';
import position from './position';
import resources from './resources';
import statuses from './statuses';
import tags from './tags';
import teams from './teams';
import uploads from './uploads';
import user from './user';
import users from './users';
import visitors from './visitors';
import visits from './visits';

// Sorted Alphabetically
const reducer = combineReducers({
  connected: connectivity,
  locations,
  position,
  resources,
  statuses,
  tags,
  teams,
  uploads,
  user,
  users,
  visitors,
  visits,
});

export default reducer;
