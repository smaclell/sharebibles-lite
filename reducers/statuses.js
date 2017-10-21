// A hardcoded list of interactions for each location and visit
const statuses =[
  { key: 'accepted', label: 'Accepted', icon: 'check', colorPin: 'green' },
  { key: 'delivered', label: 'Delivered', icon: 'book', colorPin: 'blue' },
  { key: 'not-home', label: 'Not Home', icon: 'repeat', colorPin: 'linen' },
  { key: 'rejected', label: 'Rejected', icon: 'close', colorPin: 'red' },
];

function reducer(state = statuses) {
  return state;
}

export default reducer;
