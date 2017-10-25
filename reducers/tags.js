import I18n from '../assets/i18n/i18n';


// A hardcoded list of interactions for each location and visit
const tags = {
  initial: [
    'tag/initial/cannot_read',
    'tag/initial/christian',
  ],
  followUp: [
    'tag/followup/prayer',
    'tag/followup/read_bible',
    'tag/followup/understood_gospel',
    'tag/followup/joined_discipleship_group',
    'tag/followup/received_baptism',
  ],
};

function reducer(state = tags) {
  return state;
}

export default reducer;
