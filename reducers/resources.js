// Hardcoded data regarding resources being distributed
// Use to track the number of resources distributed and needed at a location

// Based on https://trello.com/c/rIzf09DV
import I18n from '../assets/i18n/i18n';

const initial = [
  {
    key: 'resource_english_bible_esv',
    language: 'en-us', // Language as a language code
    format: 'book', // ['book', 'documents', 'document', 'audio', 'app', 'sd-card', 'video']
    translation: 'ESV',
  },
];

export default function reducer(state = initial) {
  return state;
}
