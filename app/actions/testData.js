/* eslint no-plusplus: 0 */
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
    imageUrl: 'https://google.com/favicon.ico',
    created: new Date(),
    latitude: 50, // TODO: Generate these in a small city area
    longitude: 50,
    bibles: 1,
    ...options,
    uploaded: false, //
  };
}

let lastVisitId = 10000;
export function createFakeVisit(distributionId, creator, options) {
  return {
    id: lastVisitId++,
    distributionId,
    created: new Date(),
    createdBy: creator.id,
    tags: [], // Actions performed, too technical?
    notes: '',
    teamId: creator.teamId,
    ...options,
    uploaded: false, // TODO: Handle uploading them.
  };
}
