import * as apis from '../apis';
import { fetchAllLocationData } from './locations';
import { allowDownload, updateAllowDownload } from './permissions';
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
    const { position } = getState();
    const key = dispatch(getGeoKey());
    if (!key) {
      return;
    }

    query = apis.queryGeoData(
      key,
      position,
      locationKey => dispatch(fetchAllLocationData(locationKey)),
    );
  };
}

export function change(value) {
  return async (dispatch) => {
    await dispatch(updateAllowDownload(value));
    if (value) {
      dispatch(updateLocations());
    } else {
      query = initial;
    }
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
  return async (dispatch) => {
    const allowed = await dispatch(allowDownload);
    if (allowed) {
      dispatch(updateLocations());
    }
  };
}
