import * as apis from '../apis';
import { fetchAllLocationData } from './locations';
import { wrapLatitude, wrapLongitude } from '../utils/geo';

const REGION_MODE = apis.GEO_REGION_KEY;

const initial = {
  updateCriteria() {},
  cancel() {},
};
let query = initial;

export function update(latitude, longitude) {
  return () =>
    query.updateCriteria({
      center: [
        wrapLatitude(latitude),
        wrapLongitude(longitude),
      ],
    });
}

function getGeoKey() {
  return (dispatch, getState) => {
    const { authentication: { regionKey } } = getState();
    if (!regionKey) {
      return null;
    }
    return `${REGION_MODE}/${regionKey}`;
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
    if (!key) {
      return;
    }

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
  return dispatch => dispatch(updateMode(REGION_MODE));
}
