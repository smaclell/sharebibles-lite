// A hardcoded list of interactions for each location and visit
const shared = ['accepted', 'need', 'have', 'rejected', 'delivered'];
const tags = {
  initial: [
    {
      key: 'cannot_read',
      label: 'tag/initial/cannot_read',
      statuses: shared,
    },
    {
      key: 'christian',
      label: 'tag/initial/christian',
      statuses: shared,
    },
  ],
  followUp: [
    {
      key: 'prayer',
      label: 'tag/followup/prayer',
      statuses: [...shared, 'unfinished'],
    },
    {
      key: 'read_bible',
      label: 'tag/followup/read_bible',
      statuses: shared,
    },
    {
      key: 'understood_gospel',
      label: 'tag/followup/understood_gospel',
      statuses: shared,
    },
    {
      key: 'joined_discipleship_group',
      label: 'tag/followup/joined_discipleship_group',
      statuses: shared,
    },
    {
      key: 'received_baptism',
      label: 'tag/followup/received_baptism',
      statuses: shared,
    },
  ],
};

function reducer(state = tags) {
  return state;
}

export default reducer;
