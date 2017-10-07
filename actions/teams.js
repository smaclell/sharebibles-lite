import { team as testTeam } from './testData';

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
    // TODO FIREBASE

    if (teamKey === testTeam.key) {
      return Promise.resolve()
        .then(() => dispatch(receiveTeam(testTeam)));
    }

    return Promise.resolve();
  };
}
