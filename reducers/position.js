import { UPDATE_POSITION } from '../actions/position';

const initial = { latitude: 37.78825, longitude: -122.4324 };

export default function reducer(state = initial, action) {
  if (action.type === UPDATE_POSITION) {
    return {
      latitude: action.latitude,
      longitude: action.longitude,
    };
  }

  return state;
}
