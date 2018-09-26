const green = '#1cec75';
const blue = '#22b4f0';
const red = 'red';
const yellow = '#ffdd00';

// A hardcoded list of interactions for each location and visit
// NOTE: KEY value must match second part of LABEL. Not doing so will break all the things
const statuses = [
  // Home
  {
    key: 'accepted', label: 'status/accepted', icon: 'check-circle', iconFamily: 'feather', pinColor: green, group: 'home', success: true,
  },
  {
    key: 'need', label: 'status/need', icon: 'exclamation-circle', iconFamily: 'font-awesome', pinColor: blue, group: 'home', success: false,
  },
  {
    key: 'have', label: 'status/have', icon: 'open-book', iconFamily: 'entypo', pinColor: green, group: 'home', success: true,
  },
  {
    key: 'rejected', label: 'status/rejected', icon: 'x-circle', iconFamily: 'feather', pinColor: red, group: 'home', success: false,
  },

  // Not Home
  {
    key: 'delivered', label: 'status/delivered', icon: 'package', iconFamily: 'feather', pinColor: green, group: 'not_home', success: true,
  },
  {
    key: 'unfinished', label: 'status/unfinished', icon: 'refresh-cw', iconFamily: 'feather', pinColor: yellow, group: 'not_home', success: false,
  },
];

function reducer(state = statuses) {
  return state;
}

export default reducer;
