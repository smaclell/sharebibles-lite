import { team as testTeam } from './testData';

export const FETCH_TEAM = 'FETCH_TEAM';
export const RECEIVED_TEAM = 'RECEIVE_TEAM';

export function receiveTeam(team) {
  return {
    type: RECEIVED_TEAM,
    team,
  };
}

export function fetchTeam(teamId) {
  return (dispatch) => {
    // TODO FIREBASE

    if (teamId === testTeam.id) {
      return Promise.resolve()
        .then(() => dispatch(receiveTeam(testTeam)));
    }

    return Promise.resolve();
  };
}
