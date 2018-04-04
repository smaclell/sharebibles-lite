import { Constants, SecureStore } from 'expo';
import Sentry from 'sentry-expo';
import { signIn, signOut } from '../apis';
import refetch from '../utils/refetch';

const { serviceUrl } = Constants.manifest.extra;

async function save(values) {
  return SecureStore.setItemAsync('auth', JSON.stringify(values));
}

async function load() {
  return SecureStore.getItemAsync('auth').then(JSON.parse);
}

async function clear() {
  return SecureStore.deleteItemAsync('auth');
}

export const ACCEPTED = 'ACCEPTED';
function accepted({ regionKey, teamKey }) {
  return { type: ACCEPTED, regionKey, teamKey };
}

export function logout() {
  return async (dispatch) => {
    await clear();
    dispatch(accepted({}));
    await signOut();
  };
}

function authenticate(refreshToken) {
  return async (dispatch) => {
    let token;
    try {
      const response = await refetch(`${serviceUrl}/api/auth/token`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${refreshToken}`,
        },
      });

      token = response.token;
    } catch (err) {
      Sentry.captureException(err);
      if (err.status !== 401) {
        throw err;
      }
    }

    if (!token) {
      return signIn(token);
    }

    return dispatch(logout());
  };
}

export function restore() {
  return async (dispatch) => {
    let values;
    try {
      values = await load();
    } catch (e) {
      values = null;
    }

    if (!values || !values.refreshToken) {
      return;
    }

    dispatch(accepted(values));
    await dispatch(authenticate(values.refreshToken));
  };
}

export function accept(token) {
  return async (dispatch) => {
    const values = await refetch(`${serviceUrl}/api/auth/invites/accept`, {
      method: 'POST',
      body: JSON.stringify({ token: token.trim() }),
    });

    await save(values);

    dispatch(accepted(values));
    await dispatch(authenticate(values.refreshToken));
  };
}
