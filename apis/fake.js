/* eslint no-plusplus: 0 */
let lastUserKey = 1;
const fakeTeamKey = 7;

const rob = {
  key: (lastUserKey++).toString(),
  teamKey: fakeTeamKey,
  name: 'Rob Wiebe',
  imageUrl: 'https://gravatar.com/avatar/b23ec8577b034bb29c6c761bce752a0d.png?s=100&d=mm',
};

const sean = {
  key: (lastUserKey++).toString(),
  teamKey: fakeTeamKey,
  name: 'Sean Braacx',
  imageUrl: 'https://gravatar.com/avatar/e06ba756dfcd57c07fa8e0aa3b352906.png?s=200&d=mm',
};

const ian = {
  key: (lastUserKey++).toString(),
  teamKey: fakeTeamKey,
  name: 'Ian Edington',
  imageUrl: 'https://gravatar.com/avatar/7785a42d3b969050cd59679cbd610888.png?s=100&d=mm',
};

const zhuoJue = {
  key: (lastUserKey++).toString(),
  teamKey: fakeTeamKey,
  name: 'ZhuoJue Lee',
  imageUrl: 'https://gravatar.com/avatar/c40b2007221c189f4afce2caf78997e2.png?s=100&d=mm',
};

const zafar = {
  key: (lastUserKey++).toString(),
  teamKey: fakeTeamKey,
  name: 'Zafar Siddiqi',
  imageUrl: 'https://gravatar.com/avatar/d86825a375fe5703a43b3094bfa759bf.png?s=100&d=mm',
};

const scott = {
  key: (lastUserKey++).toString(),
  teamKey: fakeTeamKey,
  name: 'Scott MacLellan',
  imageUrl: 'https://gravatar.com/avatar/36cb916d45e5b4ab10273ca266217ed7.png?s=100&d=mm',
};

export const user = rob;

export const team = {
  key: fakeTeamKey,
  name: 'awesome',
  users: [
    rob.key,
    sean.key,
    ian.key,
    zhuoJue.key,
    zafar.key,
    scott.key,
  ],
};

export function initialize() {

}

export function signIn() {
  return Promise.resolve(user);
}

export function fetchTeam(teamKey) {
  return Promise.resolve(teamKey === team.key ? team : null);
}

export function fetchUser(userKey) {
  return Promise.resolve(userKey === user.key ? user : null);
}

let lastLocationKey = 1000;
export function createLocation(create) {
  return {
    created: {
      key: (lastLocationKey++).toString(),
      ...create,
    },
    saved: Promise.resolve(),
  };
}

let lastVisitKey = 10000;
export function createVisit(create) {
  return {
    created: {
      key: (lastVisitKey++).toString(),
      ...create,
    },
    saved: Promise.resolve(),
  };
}
