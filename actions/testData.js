/* eslint no-plusplus: 0 */
import moment from 'moment';

let lastUserId = 1;
const teamId = 7;

const rob = {
  id: lastUserId++,
  teamId,
  name: 'Rob Wiebe',
  imageUrl: 'https://gravatar.com/avatar/b23ec8577b034bb29c6c761bce752a0d.png?s=100&d=mm',
};

const sean = {
  id: lastUserId++,
  teamId,
  name: 'Sean Braacx',
  imageUrl: 'https://gravatar.com/avatar/e06ba756dfcd57c07fa8e0aa3b352906.png?s=200&d=mm',
};

const ian = {
  id: lastUserId++,
  teamId,
  name: 'Ian Edington',
  imageUrl: 'https://gravatar.com/avatar/7785a42d3b969050cd59679cbd610888.png?s=100&d=mm',
};

const zhuoJue = {
  id: lastUserId++,
  teamId,
  name: 'ZhuoJue Lee',
  imageUrl: 'https://gravatar.com/avatar/c40b2007221c189f4afce2caf78997e2.png?s=100&d=mm',
};

const zafar = {
  id: lastUserId++,
  teamId,
  name: 'Zafar Siddiqi',
  imageUrl: 'https://gravatar.com/avatar/d86825a375fe5703a43b3094bfa759bf.png?s=100&d=mm',
};

const scott = {
  id: lastUserId++,
  teamId,
  name: 'Scott MacLellan',
  imageUrl: 'https://gravatar.com/avatar/36cb916d45e5b4ab10273ca266217ed7.png?s=100&d=mm',
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
