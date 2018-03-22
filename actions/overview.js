import * as apis from '../apis';
import { fetchAllLocationData } from './locations';
import { wrapLatitude, wrapLongitude } from '../utils/geo';

const REGION_MODE = apis.GEO_REGION_KEY;

const initial = {
  updateCriteria() {},
  cancel() {},
};
let query = initial;

function getGeoKey() {
  return (dispatch, getState) => {
    const { regionKey } = getState();
    return `${REGION_MODE}/${regionKey}`;
  };
}

function updateLocations() {
  return (dispatch, getState) => {
    if (query) {
      query.cancel();
    }
    const { position } = getState();
    const key = dispatch(getGeoKey());

    query = apis.queryGeoData(
      key,
      position,
      locationKey => dispatch(fetchAllLocationData(locationKey)),
    );
  };
}

export function update(latitude, longitude) {
  return (dispatch) => {
    query.updateCriteria({
      center: [
        wrapLatitude(latitude),
        wrapLongitude(longitude),
      ],
    });
    dispatch(updateLocations());
  };
}

export const UPDATE_OVERVIEW_MODE = 'UPDATE_OVERVIEW_MODE';
export function updateMode(mode) {
  return (dispatch) => {
    dispatch(updateLocations());

    dispatch({
      type: UPDATE_OVERVIEW_MODE,
      mode,
    });
  };
}

export function initialize() {
  return dispatch => dispatch(updateMode(REGION_MODE));
}
