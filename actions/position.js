import { getCurrentPosition } from '../apis/geo';
import { updateCenter } from './overview';

export const UPDATE_POSITION = 'UPDATE_POSITION';
export function updatePosition(latitude, longitude) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_POSITION,
      latitude,
      longitude,
    });

    dispatch(updateCenter(latitude, longitude));
  };
}

export function initialize() {
  return async (dispatch) => {
    const { location } = await getCurrentPosition();
    if (location) {
      dispatch(updatePosition(location.latitude, location.longitude));
    }
  };
}
