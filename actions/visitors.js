export const UPDATE_VISTORS = 'UPDATE_VISTORS';
export function update(users) {
  return {
    type: UPDATE_VISTORS,
    users,
  };
}
