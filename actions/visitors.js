
export const TOGGLE_VISTOR = 'TOGGLE_VISTOR';
export function toggleVistor(userKey) {
  return {
    type: TOGGLE_VISTOR,
    userKey,
  };
}

export const UPDATE_VISITORS = 'UPDATE_VISITORS';
export function update(users) {
  return {
    type: UPDATE_VISITORS,
    users,
  };
}
