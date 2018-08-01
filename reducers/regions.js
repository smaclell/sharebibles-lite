import { CLEAR, SAVE } from '../actions/regions';

const initial = {};

export default function reducer(state = initial, action) {
  if (action.type === SAVE) {
    return {
      ...state,
      [action.region.regionKey]: {
        regionKey: action.region.regionKey,
        metadata: action.region,
        geojson: action.geojson,
      },
    };
  }

  if (action.type === CLEAR) {
    return initial;
  }

  return state;
}
