import { combineReducers } from 'redux';

// Sorted Alphabetically
import authentication from './authentication';
import connectivity from './connectivity';
import i18n from './i18n';
import locations from './locations';
import permissions from './permissions';
import position from './position';
import regions from './regions';
import resources from './resources';
import settings from './settings';
import statuses from './statuses';
import uploads from './uploads';
import onboarding from './onboarding';

// Sorted Alphabetically
const reducer = combineReducers({
  authentication,
  connected: connectivity,
  i18n,
  locations,
  onboarding,
  permissions,
  position,
  regions,
  resources,
  settings,
  statuses,
  uploads,
});

export default reducer;
