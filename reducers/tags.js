// A hardcoded list of interactions for each location and visit
const tags = {
  statuses: {
    interested: { label: 'Interested' },
    rejected: { label: 'Rejected', exclusive: true },
    notHome: { label: 'Not Home', exclusive: true },
  },
  location: [
    { key: 'cannotRead', label: 'Can Not Read' },
    { key: 'christian', label: 'Is Christian?' },
  ],
  visit: [
    { key: 'prayer', label: 'Received Prayer' },
    { key: 'readBible', label: 'Read the Bible' },
    { key: 'understoodGospel', label: 'Understood the Gospel' },
    { key: 'joinedDiscipleshipGroup', label: 'Joined Discipleship Group' },
    { key: 'receivedBaptism', label: 'Received Baptism' },
    // { key: 'needsFollowUp', label: 'Needs Follow Up' },
  ],
};

function reducer(state = tags) {
  return state;
}

export default reducer;
