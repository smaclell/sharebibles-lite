// A hardcoded list of interactions for each location and visit
const statuses = [
  // Home
  { key: 'accepted', label: 'status/accepted', icon: 'book', iconFamily: 'font-awesome', pinColor: 'green', group: 'home', success: true },
  { key: 'need', label: 'status/need', icon: 'exclamation-circle', iconFamily: 'font-awesome', pinColor: 'green', group: 'home', success: false },
  { key: 'have', label: 'status/have', icon: 'check-circle', iconFamily: 'font-awesome', pinColor: 'green', group: 'home', success: true },
  { key: 'rejected', label: 'status/rejected', icon: 'circle-with-cross', iconFamily: 'entypo', pinColor: 'grey', group: 'home', success: false },

  // Not Home
  { key: 'delivered', label: 'status/delivered', icon: 'book', iconFamily: 'font-awesome', pinColor: 'green', group: 'not_home', success: true },
  { key: 'unfinished', label: 'status/unfinished', icon: 'block', iconFamily: 'entypo', pinColor: 'grey', group: 'not_home', success: false },

  // From testing, remove after next reset
  { key: 'not_home', label: 'status/not_home', icon: 'home', pinColor: 'grey', group: 'ignore' },
];

function reducer(state = statuses) {
  return state;
}

export default reducer;
