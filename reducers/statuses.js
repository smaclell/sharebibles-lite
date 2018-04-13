// A hardcoded list of interactions for each location and visit
const green = '#1cec75';
const blue = '#22b4f0';
const red = 'red';
const yellow = '#ffdd00';

const statuses = [
  // Home
  { key: 'accepted', label: 'status/accepted', icon: 'book', iconFamily: 'font-awesome', pinColor: green, group: 'home', success: true },
  { key: 'need', label: 'status/need', icon: 'exclamation-circle', iconFamily: 'font-awesome', pinColor: blue, group: 'home', success: false },
  { key: 'have', label: 'status/have', icon: 'check-circle', iconFamily: 'font-awesome', pinColor: green, group: 'home', success: true },
  { key: 'rejected', label: 'status/rejected', icon: 'circle-with-cross', iconFamily: 'entypo', pinColor: red, group: 'home', success: false },

  // Not Home
  { key: 'delivered', label: 'status/delivered', icon: 'book', iconFamily: 'font-awesome', pinColor: green, group: 'not_home', success: true },
  { key: 'unfinished', label: 'status/unfinished', icon: 'block', iconFamily: 'entypo', pinColor: yellow, group: 'not_home', success: false },
];

function reducer(state = statuses) {
  return state;
}

export default reducer;
