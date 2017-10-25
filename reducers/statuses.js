import I18n from '../assets/i18n/i18n';


// A hardcoded list of interactions for each location and visit
const statuses =[
  { key: 'status/accepted', icon: 'check', colorPin: 'green' },
  { key: 'status/delivered', icon: 'book', colorPin: 'blue' },
  { key: 'status/not_home', icon: 'repeat', colorPin: 'linen' },
  { key: 'status/rejected', icon: 'close', colorPin: 'red' },
];

function reducer(state = statuses) {
  return state;
}

export default reducer;
