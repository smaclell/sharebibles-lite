// A hardcoded list of interactions for each location and visit
const tags = {
  initial: [
    {
      key: 'cannot_read',
      label: 'tag/initial/cannot_read',
      statuses: ['accepted', 'need', 'have', 'rejected'],
    },
    {
      key: 'christian',
      label: 'tag/initial/christian',
      statuses: ['accepted', 'need', 'have', 'rejected'],
    },
  ],
  followUp: [
    {
      key: 'prayer',
      label: 'tag/followup/prayer',
      statuses: ['accepted', 'need', 'have', 'rejected', 'delivered', 'unfinished'],
    },
    {
      key: 'read_bible',
      label: 'tag/followup/read_bible',
      statuses: ['accepted', 'need', 'have', 'rejected'],
    },
    {
      key: 'understood_gospel',
      label: 'tag/followup/understood_gospel',
      statuses: ['accepted', 'need', 'have', 'rejected'],
    },
    {
      key: 'joined_discipleship_group',
      label: 'tag/followup/joined_discipleship_group',
      statuses: ['accepted', 'need', 'have', 'rejected'],
    },
    {
      key: 'received_baptism',
      label: 'tag/followup/received_baptism',
      statuses: ['accepted', 'need', 'have', 'rejected'],
    },
  ],
};

function reducer(state = tags) {
  return state;
}

export default reducer;
