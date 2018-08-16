import { Constants } from 'expo';
import Sentry from 'sentry-expo';
import refetch from '../utils/refetch';
import selector from '../selectors/whichRegion';

export const CLEAR = 'REGIONS_CLEAR';
export const clear = () => ({
  type: CLEAR,
});

export const SAVE = 'REGIONS_SAVE';
export const save = (region, geojson) => ({
  type: SAVE,
  region,
  geojson,
});

export function request(regionKey) {
  return async (dispatch) => {
    const { mapsUrl } = Constants.manifest.extra;
    try {
      const [region, geojson] = await Promise.all([
        refetch(`${mapsUrl}/regions/${regionKey}`, { method: 'GET' }),
        refetch(`${mapsUrl}/geojson/${regionKey}`, { method: 'GET' }),
      ]);

      dispatch(save(region, geojson));
    } catch (err) {
      Sentry.captureException(err);
      return false;
    }

    return true;
  };
}

export function containing({ latitude, longitude }) {
  return (dispatch, getState) => {
    const { regions } = getState();
    const finder = selector(regions);
    const { regionKey } = finder.query([latitude, longitude]) || {};
    return regionKey;
  };
}