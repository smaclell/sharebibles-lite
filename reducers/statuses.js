// A hardcoded list of interactions for each location and visit
const statuses = [
  { key: 'accepted', label: 'status/accepted', icon: 'check', pinColor: 'green' },
  { key: 'delivered', label: 'status/delivered', icon: 'book', pinColor: 'blue' },
  { key: 'not_home', label: 'status/not_home', icon: 'repeat', pinColor: 'linen' },
  { key: 'rejected', label: 'status/rejected', icon: 'close', pinColor: 'red' },
];

function reducer(state = statuses) {
  return state;
}

export default reducer;
