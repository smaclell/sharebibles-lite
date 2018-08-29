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
    const { authentication: { regionKey } } = getState();
    if (!regionKey) {
      return null;
    }
    return `${REGION_MODE}/${regionKey}`;
  };
}

function updateLocations() {
  return (dispatch, getState) => {
    if (query) {
      query.cancel();
    }
    const { position, connectivity: { isOfflineOnly } } = getState();
    const key = dispatch(getGeoKey());
    if (!key || isOfflineOnly) {
      return;
    }

    query = apis.queryGeoData(
      key,
      position,
      locationKey => dispatch(fetchAllLocationData(locationKey)),
    );
  };
}

export function update(latitude, longitude) {
  return () => {
    query.updateCriteria({
      center: [
        wrapLatitude(latitude),
        wrapLongitude(longitude),
      ],
    });
  };
}

export function initialize() {
  return dispatch => dispatch(updateLocations());
}
