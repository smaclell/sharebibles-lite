// Hardcoded data regarding resources being distributed
// Use to track the number of resources distributed and needed at a location

// Based on https://trello.com/c/rIzf09DV

const initial = {
  1: {
    key: '1',
    summary: 'Complete English Bible',
    language: 'en-us', // Language as a language code
    format: 'book', // ['book', 'documents', 'document', 'audio', 'app', 'sd-card', 'video']
    translation: 'ESV',
  },
};

export default function reducer(state = initial) {
  return state;
}
