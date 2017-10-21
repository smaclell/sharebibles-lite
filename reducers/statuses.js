// A hardcoded list of interactions for each location and visit
const statuses =[
  { key: 'accepted', label: 'Accepted', icon: 'check'},
  { key: 'delivered', label: 'Delivered', icon: 'book'},
  { key: 'not-home', label: 'Not Home', icon: 'repeat'},
  { key: 'rejected', label: 'Rejected', icon: 'close'},
];

function reducer(state = statuses) {
  return state;
}

export default reducer;
