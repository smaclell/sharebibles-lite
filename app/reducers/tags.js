// A hardcoded list of interactions for each converation and visit
const tags = {
  interested: { label: 'Interested' },
  rejected: { label: 'Rejected', exclusive: true },
  notHome: { label: 'Not Home', exclusive: true },
  cannotRead: { label: 'Can Not Read', conversationOnly: true },
  christian: { label: 'Is Christian', conversationOnly: true },
  prayer: { label: 'Received Prayer' },
  readBible: { label: 'Read the Bible' },
  understoodGospel: { label: 'Understood the Gospel' },
  joinedDiscipleshipGroup: { label: 'Joined Discipleship Group' },
  receivedBaptism: { label: 'Received Baptism' },
  needsFollowUp: { label: 'Needs Follow Up' },
};

function reducer(state = tags, action) { // eslint-disable-line no-unused-vars
  return state;
}

export default reducer;
