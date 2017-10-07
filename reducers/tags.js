// A hardcoded list of interactions for each location and visit
const tags = {
  interested: { label: 'Interested' },
  rejected: { label: 'Rejected', exclusive: true },
  notHome: { label: 'Not Home', exclusive: true },
  cannotRead: { label: 'Can Not Read', locationOnly: true },
  christian: { label: 'Is Christian', locationOnly: true },
  prayer: { label: 'Received Prayer' },
  readBible: { label: 'Read the Bible' },
  understoodGospel: { label: 'Understood the Gospel' },
  joinedDiscipleshipGroup: { label: 'Joined Discipleship Group' },
  receivedBaptism: { label: 'Received Baptism' },
  needsFollowUp: { label: 'Needs Follow Up' },
};

function reducer(state = tags) {
  return state;
}

export default reducer;
