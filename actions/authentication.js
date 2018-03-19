/* global fetch */
import { Constants, SecureStore } from 'expo';
import { signIn, signOut } from '../apis';

const { serviceUrl } = Constants.manifest.extra;

async function save(values) {
  return SecureStore.setItemAsync('auth', JSON.stringify(values));
}

async function load() {
  return SecureStore.getItemAsync('auth');
}

async function clear() {
  return SecureStore.deleteItemAsync('auth');
}

export const ACCEPTED = 'ACCEPTED';
function accepted({ regionKey, teamKey }) {
  return { type: ACCEPTED, regionKey, teamKey };
}

async function authenticate(refreshToken) {
  const response = await fetch(`${serviceUrl}/api/auth/token`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${refreshToken}`,
    },
  });

  const { token } = await response.json();
  return signIn(token);
}

export function restore() {
  return async (dispatch) => {
    const values = await load();

    if (!values || !values.refreshToken) {
      return;
    }

    dispatch(accepted(values));
    await authenticate(values.refreshToken);
  };
}

export function accept(token) {
  return async (dispatch) => {
    const response = await fetch(`${serviceUrl}/api/auth/invites/accept`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ token: token.trim() }),
    });

    const values = await response.json();
    await save(values);

    dispatch(accepted(values));
    await authenticate(values.refreshToken);
  };
}

export function logout() {
  return async (dispatch) => {
    await clear();
    dispatch(accepted({}));
    await signOut();
  };
}
