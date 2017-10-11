/* globals __DEV__ */
import moment from 'moment';
import * as fake from './fake';
import * as firebase from './firebase';

const apis = __DEV__ ? fake : firebase;

export function initalize() {
  return apis.initialize();
}

export function signIn() {
  return apis.signIn();
}

export function fetchTeam(teamKey) {
  return apis.fetchTeam(teamKey);
}

export function fetchUser(userKey) {
  return apis.fetchUser(userKey);
}

export function createLocation(options) {
  const create = {
    name: 'Anything', // TODO: Remove the name
    imageUrl: 'https://google.com/favicon.ico',
    created: moment.utc().valueOf(),
    latitude: 50,
    longitude: 50,
    address: null,
    status: null,
    resources: {}, // { given: number, needed: number }
    // tags|status:
    // Considering a tag/status object/array to represent the many checkboxes
    // Initially it would be populated/managed by a number of hardcoded values
    ...options,
  };

  const { created, saved } = apis.createLocation(create);

  return Promise.resolve({
    created,
    saved,
  });
}

export function createVisit(locationKey, creator, options) {
  const create = {
    locationKey,
    created: moment.utc().valueOf(),
    createdBy: creator.key,
    visitors: {
      [creator.key]: true,
    },
    tags: [], // Actions performed, too technical?
    notes: '',
    teamKey: creator.teamKey,
    ...options,
  };

  const { created, saved } = apis.createVisit(create);

  return Promise.resolve({
    created,
    saved,
  });
}
