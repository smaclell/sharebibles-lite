import * as apis from '../apis';
import { fetchAllLocationData } from './locations';
import { wrapLongitude, wrapLatitude } from '../utils/geo';

export const TEAM_MODE = apis.GEO_TEAM_KEY;
export const USER_MODE = apis.GEO_USER_KEY;

const initial = {
  updateCriteria() {},
  cancel() {},
};
let query = initial;

export function update(latitude, longitude) {
  return () =>
    query.updateCriteria({
      center: [
        wrapLongitude(latitude),
        wrapLongitude(longitude),
      ],
    });
}

function getGeoKey(mode) {
  return (dispatch, getState) => {
    const { user, users } = getState();
    if (mode !== TEAM_MODE) {
      return `${USER_MODE}/${user}`;
    }

    const { teamKey } = users[user];
    return `${TEAM_MODE}/${teamKey}`;
  };
}

export const UPDATE_OVERVIEW_MODE = 'UPDATE_OVERVIEW_MODE';
export function updateMode(mode) {
  return (dispatch, getState) => {
    if (query) {
      query.cancel();
    }

    const { position } = getState();
    const key = dispatch(getGeoKey(mode));

    query = apis.queryGeoData(
      key,
      position,
      locationKey => dispatch(fetchAllLocationData(locationKey)),
    );

    dispatch({
      type: UPDATE_OVERVIEW_MODE,
      mode,
    });
  };
}

export function initialize() {
  return dispatch => dispatch(updateMode(USER_MODE));
}
