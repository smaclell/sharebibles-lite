import I18n from 'ex-react-native-i18n';
import en from './locales/en';
import fr from './locales/fr';

I18n.fallbacks = true;

I18n.translations = {
  en, // default
  fr,
};

export default I18n;
