import { getCurrentPosition } from '../apis/geo';
// import { update } from './overview';

export const UPDATE_POSITION = 'UPDATE_POSITION';
export function updatePosition(latitude, longitude) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_POSITION,
      latitude,
      longitude,
    });

    // dispatch(update(latitude, longitude));
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
