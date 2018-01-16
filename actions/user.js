import Sentry from 'sentry-expo';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export function setUser(user) {
  return (dispatch) => {
    dispatch({
      type: SET_CURRENT_USER,
      user,
    });

    Sentry.setUserContext(user ? { userKey: user.key, teamKey: user.teamKey } : undefined);
  };
}
