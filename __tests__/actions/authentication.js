import configureStore from 'redux-mock-store';
import { Constants, SecureStore } from 'expo';
import thunk from 'redux-thunk';
import refetch from '../../utils/refetch';
import { signIn, signOut } from '../../apis';

// jest.mock('expo');
jest.mock('../../utils/refetch');
jest.mock('../../apis');

describe('actions/authentication', () => {
  let actions;
  let store;
  beforeEach(() => {
    Constants.manifest.extra.serviceUrl = 'serviceUrl';
    SecureStore.setItemAsync = jest.fn().mockResolvedValue();
    SecureStore.getItemAsync = jest.fn().mockResolvedValue('{}');
    SecureStore.deleteItemAsync = jest.fn().mockResolvedValue();
    refetch.mockClear();
    signIn.mockClear();
    signOut.mockClear();
    store = configureStore([thunk])({});

    actions = require('../../actions/authentication');
  });

  describe('logout', () => {
    beforeEach(() => store.dispatch(actions.logout()));

    it('deletes the saved auth', () => {
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('auth');
    });

    it('updates the store', () => {
      expect(store.getActions()).toContainEqual({
        type: actions.ACCEPTED,
        regionKey: undefined,
        teamKey: undefined,
      });
    });

    it('signs out of firebase', () => {
      expect(signOut).toHaveBeenCalled();
    });
  });
});
