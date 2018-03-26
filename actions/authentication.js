/* global fetch */
import { Constants, SecureStore } from 'expo';
import { signIn, signOut } from '../apis';

const { serviceUrl } = Constants.manifest.extra;

async function refetch(url, options) {
  const params = Object.assign({ headers: {} }, options);

  params.headers['content-type'] = 'application/json';

  const response = await fetch(url, params);

  let values;

  try {
    if (response.status !== 204) {
      values = await response.json();
    }
  } catch (e) {
    values = {};
  }

  if (!response.ok) {
    const error = new Error(`Response was not okay when calling: ${url}`);
    error.status = response.status;
    error.reason = values.error || values.message || 'unknown';
    throw error;
  }

  return values;
}

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
  const { token } = await refetch(`${serviceUrl}/api/auth/token`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${refreshToken}`,
    },
  });

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
    const values = await refetch(`${serviceUrl}/api/auth/invites/accept`, {
      method: 'POST',
      body: JSON.stringify({ token: token.trim() }),
    });

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
