// A hardcoded list of interactions for each location and visit
const home = ['accepted', 'need', 'have', 'rejected'];
const shared = [...home, 'delivered'];
const tags = {
  initial: [
    // Dropping cannot read so we can have sudden_healing
    // Leaving this here so we can see the previous values
    // The terms have also been left
    /*
    {
      key: 'cannot_read',
      label: 'tag/initial/cannot_read',
      statuses: home,
    },
    */
    {
      key: 'christian',
      label: 'tag/initial/christian',
      statuses: home,
    },
    {
      key: 'prayer',
      label: 'tag/initial/prayer',
      statuses: home,
    },
    {
      key: 'read_bible',
      label: 'tag/initial/read_bible',
      statuses: home,
    },
    {
      key: 'received_baptism',
      label: 'tag/initial/received_baptism',
      statuses: home,
    },
    {
      key: 'sudden_healing',
      label: 'tag/initial/sudden_healing',
      statuses: home,
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
