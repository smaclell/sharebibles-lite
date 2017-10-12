import * as apis from '../apis';

export const FETCH_TEAM = 'FETCH_TEAM';
export const RECEIVED_TEAM = 'RECEIVE_TEAM';

export function receiveTeam(team) {
  return {
    type: RECEIVED_TEAM,
    team,
  };
}

export function fetchTeam(teamKey) {
  return (dispatch) => {
    let team;
    return apis.fetchTeam(teamKey)
      .then((found) => {
        team = found;
      })
      .then(() => dispatch(receiveTeam(team)))
      .then(() => team);
  };
}
