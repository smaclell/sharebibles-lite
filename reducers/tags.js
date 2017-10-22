import I18n from '../assets/i18n/i18n';


// A hardcoded list of interactions for each location and visit
const tags = {
  initial: [
    'tag_initial_cannot_read',
    'tag_initial_christian',
  ],
  followUp: [
    'tag_followup_prayer',
    'tag_followup_read_bible',
    'tag_followup_understood_gospel',
    'tag_followup_joined_discipleship_group',
    'tag_followup_received_baptism',
  ],
};

function reducer(state = tags) {
  return state;
}

export default reducer;
