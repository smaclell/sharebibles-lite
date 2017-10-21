// A hardcoded list of interactions for each location and visit
const statuses =[
  { key: 'accepted', label: 'Accepted', icon: 'check', colorPin: 'green', rank: 0 },
  { key: 'delivered', label: 'Delivered', icon: 'book', colorPin: 'blue', rank: 1 },
  { key: 'not-home', label: 'Not Home', icon: 'repeat', colorPin: 'grey', rank: 2 },
  { key: 'rejected', label: 'Rejected', icon: 'close', colorPin: 'red', rank: 3 },
];

function reducer(state = statuses) {
  return state;
}

export default reducer;
