import { getCurrentPosition } from '../apis/geo';

export const UPDATE_POSITION = 'UPDATE_POSITION';
export const updatePosition = (latitude, longitude) => ({
  type: UPDATE_POSITION,
  latitude,
  longitude,
});

export const initialize = () => {
  return async (dispatch) => {
    const { location } = await getCurrentPosition();
    if (location) {
      dispatch(updatePosition(location.latitude, location.longitude));
    }
  };
};
