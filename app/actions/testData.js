/* eslint no-plusplus: 0 */
import moment from 'moment';

let lastUserId = 1;
const teamId = 7;

const rob = {
  id: lastUserId++,
  teamId,
  name: 'Rob Wiebe',
  imageUrl: 'https://google.com/favicon.ico',
};

const sean = {
  id: lastUserId++,
  teamId,
  name: 'Sean Braacx',
  imageUrl: 'https://google.com/favicon.ico',
};

const ian = {
  id: lastUserId++,
  teamId,
  name: 'Ian Edington',
  imageUrl: 'https://google.com/favicon.ico',
};

const zhuoJue = {
  id: lastUserId++,
  teamId,
  name: 'ZhuoJue Lee',
  imageUrl: 'https://google.com/favicon.ico',
};

const zafar = {
  id: lastUserId++,
  teamId,
  name: 'Zafar Siddiqi',
  imageUrl: 'https://google.com/favicon.ico',
};

const scott = {
  id: lastUserId++,
  teamId,
  name: 'Scott MacLellan',
  imageUrl: 'https://google.com/favicon.ico',
};

export const user = rob;

export const team = {
  id: teamId,
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

let lastDistributionId = 1000;
export function createFakeDistribution(options) {
  return {
    id: lastDistributionId++,
    name: 'Anything',
    imageUrl: 'https://google.com/favicon.ico',
    created: moment.utc().valueOf(),
    latitude: 50, // TODO: Generate these in a small city area
    longitude: 50,
    address: null,
    bibles: 1, // Switch to resources instead
    // tags|status:
    // Considering a tag/status object/array to represent the many checkboxes
    // Initially it would be populated/managed by a number of hardcoded values
    ...options,
    uploaded: false, // Support delayed upload with no wifi
  };
}

let lastVisitId = 10000;
export function createFakeVisit(distributionId, creator, options) {
  return {
    id: lastVisitId++,
    distributionId,
    created: moment.utc().valueOf(),
    createdBy: creator.id,
    tags: [], // Actions performed, too technical?
    notes: '',
    teamId: creator.teamId,
    ...options,
    uploaded: false, // TODO: Handle uploading them.
  };
}
