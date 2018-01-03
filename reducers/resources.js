// Hardcoded data regarding resources being distributed
// Use to track the number of resources distributed and needed at a location

// Based on https://trello.com/c/rIzf09DV
const initial = {
  generic_bible: {
    key: 'generic_bible',
    summary: 'resource/generic_bible',
    language: 'en-us', // Language as a language code
    format: 'book', // ['book', 'documents', 'document', 'audio', 'app', 'sd-card', 'video']
    statuses: ['delivered', 'accepted'],
    startCount: 1,
  },
};

export default function reducer(state = initial) {
  return state;
}
