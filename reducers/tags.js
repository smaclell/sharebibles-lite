// A hardcoded list of interactions for each location and visit
const tags = {
  initial: [
    { key: 'cannot_read', label: 'tag/initial/cannot_read' },
    { key: 'christian', label: 'tag/initial/christian' },
  ],
  followUp: [
    { key: 'prayer', label: 'tag/followup/prayer' },
    { key: 'read_bible', label: 'tag/followup/read_bible' },
    { key: 'understood_gospel', label: 'tag/followup/understood_gospel' },
    { key: 'joined_discipleship_group', label: 'tag/followup/joined_discipleship_group' },
    { key: 'received_baptism', label: 'tag/followup/received_baptism' },
  ],
};

function reducer(state = tags) {
  return state;
}

export default reducer;
