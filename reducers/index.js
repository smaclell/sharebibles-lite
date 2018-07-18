import { combineReducers } from 'redux';

// Sorted Alphabetically
import authentication from './authentication';
import connectivity from './connectivity';
import i18n from './i18n';
import locations from './locations';
import position from './position';
import resources from './resources';
import settings from './settings';
import statuses from './statuses';
import uploads from './uploads';

// Sorted Alphabetically
const reducer = combineReducers({
  authentication,
  connected: connectivity,
  i18n,
  locations,
  position,
  resources,
  settings,
  statuses,
  uploads,
});

export default reducer;
