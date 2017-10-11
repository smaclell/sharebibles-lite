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
  return dispatch =>
    apis.fetchTeam(teamKey)
      .then(team => dispatch(receiveTeam(team)));
}
