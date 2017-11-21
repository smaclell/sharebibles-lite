// A hardcoded list of interactions for each location and visit
const statuses = [
  // Home
  { key: 'accepted', label: 'status/accepted', icon: 'check', pinColor: 'green', group: 'home', success: true },
  { key: 'have', label: 'status/have', icon: 'book', pinColor: 'green', group: 'home', success: true },
  { key: 'need', label: 'status/need', icon: 'globe', pinColor: 'green', group: 'home', success: false },
  { key: 'rejected', label: 'status/rejected', icon: 'ban', pinColor: 'grey', group: 'home', success: false },

  // Not Home
  { key: 'delivered', label: 'status/delivered', icon: 'book', pinColor: 'green', group: 'not_home', success: true },
  { key: 'unfinished', label: 'status/unfinished', icon: 'repeat', pinColor: 'grey', group: 'not_home', success: false },

  // From testing, remove after next reset
  { key: 'not_home', label: 'status/not_home', icon: 'home', pinColor: 'grey', group: 'ignore' },
];

function reducer(state = statuses) {
  return state;
}

export default reducer;
