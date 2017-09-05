export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export function setUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}
