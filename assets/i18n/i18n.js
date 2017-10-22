import I18n from 'ex-react-native-i18n';
import de from './locales/de';
import en from './locales/en';
import es from './locales/es';
import fr from './locales/fr';

I18n.fallbacks = true;

I18n.translations = {
  en,  // default
  de,
  es,
  fr,
};

export default I18n; 
