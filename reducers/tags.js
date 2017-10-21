// A hardcoded list of interactions for each location and visit
const tags = {
  initial: [
    { key: 'cannotRead', label: "Can't Read" },
    { key: 'christian', label: 'Is Christian?' },
  ],
  followUp: [
    { key: 'prayer', label: 'Received Prayer' },
    { key: 'readBible', label: 'Read the Bible' },
    { key: 'understoodGospel', label: 'Understood the Gospel' },
    { key: 'joinedDiscipleshipGroup', label: 'Joined Discipleship Group' },
    { key: 'receivedBaptism', label: 'Received Baptism' },
  ],
};

function reducer(state = tags) {
  return state;
}

export default reducer;
