/* eslint no-plusplus: 0 */
import moment from 'moment';

let lastUserKey = 1;
const teamKey = 7;

const rob = {
  key: (lastUserKey++).key,
  teamKey,
  name: 'Rob Wiebe',
  imageUrl: 'https://gravatar.com/avatar/b23ec8577b034bb29c6c761bce752a0d.png?s=100&d=mm',
};

const sean = {
  key: (lastUserKey++).key,
  teamKey,
  name: 'Sean Braacx',
  imageUrl: 'https://gravatar.com/avatar/e06ba756dfcd57c07fa8e0aa3b352906.png?s=200&d=mm',
};

const ian = {
  key: (lastUserKey++).key,
  teamKey,
  name: 'Ian Edington',
  imageUrl: 'https://gravatar.com/avatar/7785a42d3b969050cd59679cbd610888.png?s=100&d=mm',
};

const zhuoJue = {
  key: (lastUserKey++).key,
  teamKey,
  name: 'ZhuoJue Lee',
  imageUrl: 'https://gravatar.com/avatar/c40b2007221c189f4afce2caf78997e2.png?s=100&d=mm',
};

const zafar = {
  key: (lastUserKey++).key,
  teamKey,
  name: 'Zafar Siddiqi',
  imageUrl: 'https://gravatar.com/avatar/d86825a375fe5703a43b3094bfa759bf.png?s=100&d=mm',
};

const scott = {
  key: (lastUserKey++).key,
  teamKey,
  name: 'Scott MacLellan',
  imageUrl: 'https://gravatar.com/avatar/36cb916d45e5b4ab10273ca266217ed7.png?s=100&d=mm',
};

export const user = rob;

export const team = {
  key: teamKey,
  name: 'awesome',
  users: [
    rob,
    sean,
    ian,
    zhuoJue,
    zafar,
    scott,
  ],
};

let lastLocationKey = 1000;
export function createFakeLocation(options) {
  return {
    key: (lastLocationKey++).toString(),
    name: 'Anything', // Remove the name
    imageUrl: 'https://google.com/favicon.ico',
    created: moment.utc().valueOf(),
    latitude: 50, // TODO: Generate these in a small city area
    longitude: 50,
    address: null,
    resources: {}, // { given: number, needed: number }
    // tags|status:
    // Considering a tag/status object/array to represent the many checkboxes
    // Initially it would be populated/managed by a number of hardcoded values
    ...options,
    uploaded: false, // Support delayed upload with no wifi
  };
}

let lastVisitKey = 10000;
export function createFakeVisit(locationKey, creator, options) {
  return {
    key: (lastVisitKey++).toString(),
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
    uploaded: false, // TODO: Handle uploading them.
  };
}
