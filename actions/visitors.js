
export const TOGGLE_VISTOR = 'TOGGLE_VISTOR';
export function toggleVistor(userKey) {
  return {
    type: TOGGLE_VISTOR,
    userKey,
  };
}

export const UPDATE_VISTORS = 'UPDATE_VISTORS';
export function update(users) {
  return {
    type: UPDATE_VISTORS,
    users,
  };
}
