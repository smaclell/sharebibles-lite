import { combineReducers } from 'redux';

// Sorted Alphabetically
import connectivity from './connectivity';
import i18n from './i18n';
import locations from './locations';
import overview from './overview';
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
  i18n,
  locations,
  overview,
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
