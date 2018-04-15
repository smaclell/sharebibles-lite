import { NetInfo } from 'react-native';

export const SET_CONNECTED = 'SET_CONNECTED';
export function setConnected(connected) {
  return {
    type: SET_CONNECTED,
    connected,
  };
}

function update(info) {
  return (dispatch) => {
    if (['none', 'unknown'].includes(info.type)) {
      dispatch(setConnected(false));
    }

    if (['wifi', 'cellular', 'ethernet'].includes(info.type)) {
      dispatch(setConnected(true));
    }
  };
}

export function setup() {
  return (dispatch) => {
    NetInfo.addEventListener(
      'connectionChange',
      info => dispatch(update(info)),
    );

    NetInfo.getConnectionInfo().then(info => dispatch(update(info)));
  };
}
