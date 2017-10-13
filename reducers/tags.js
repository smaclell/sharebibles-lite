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
    { key: 'prayer', label: 'Received Prayer', summary: 'Prayed' },
    { key: 'readBible', label: 'Read the Bible', summary: 'Read Bible' },
    { key: 'understoodGospel', label: 'Understood the Gospel', summary: 'Understanding' },
    { key: 'joinedDiscipleshipGroup', label: 'Joined Discipleship Group', summary: 'Joined a Group' },
    { key: 'receivedBaptism', label: 'Received Baptism', summary: 'Baptized' },
    // { key: 'needsFollowUp', label: 'Needs Follow Up' },
  ],
};

function reducer(state = tags) {
  return state;
}

export default reducer;
