import configureStore from 'redux-mock-store';
import { Constants, SecureStore } from 'expo';
import thunk from 'redux-thunk';
import refetch from '../../utils/refetch';
import { signIn, signOut } from '../../apis';
import { request, clear } from '../../actions/regions';

// jest.mock('expo');
jest.mock('../../utils/refetch');
jest.mock('../../apis');
jest.mock('../../actions/regions');

describe('actions/authentication', () => {
  let actions;
  let store;
  beforeEach(() => {
    Constants.manifest.extra = Constants.manifest.extra || {};
    Constants.manifest.extra.serviceUrl = 'serviceUrl';
    SecureStore.setItemAsync = jest.fn().mockResolvedValue();
    SecureStore.getItemAsync = jest.fn().mockResolvedValue('{}');
    SecureStore.deleteItemAsync = jest.fn().mockResolvedValue();
    refetch.mockClear();
    signIn.mockClear();
    signOut.mockClear();
    clear.mockClear();
    clear.mockReturnValue({ type: 'CLEAR REGION' });
    request.mockClear();
    request.mockImplementation((regionKey) => ({ type: 'FAKE REQUEST', regionKey }));

    store = configureStore([thunk])({});

    actions = require('../../actions/authentication');
  });

  describe('authenticate', () => {
    it('signsIn with returned token', async () => {
      refetch.mockResolvedValue({ token: 't9001' });

      await store.dispatch(actions.authenticate('refreshToken'));

      expect(refetch).toHaveBeenCalledWith('serviceUrl/api/auth/token', {
        method: 'POST',
        headers: {
          authorization: 'Bearer refreshToken',
        },
      });

      expect(signIn).toHaveBeenCalledWith('t9001');
    });

    it('signOut if there is no token', async () => {
      refetch.mockResolvedValue({});

      await store.dispatch(actions.authenticate('refreshToken'));

      expect(refetch).toHaveBeenCalledWith('serviceUrl/api/auth/token', {
        method: 'POST',
        headers: {
          authorization: 'Bearer refreshToken',
        },
      });

      expect(signIn).not.toHaveBeenCalled();
      expect(signOut).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    beforeEach(() => store.dispatch(actions.logout()));

    it('deletes the saved auth', () => {
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('auth');
    });

    it('updates the store', () => {
      expect(store.getActions()).toContainEqual(actions.accepted({}));
    });

    it('clear regions', () => {
      expect(store.getActions()).toContainEqual(clear());
    });

    it('signs out of firebase', () => {
      expect(signOut).toHaveBeenCalled();
    });
  });
});
