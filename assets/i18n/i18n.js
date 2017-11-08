import I18n from 'ex-react-native-i18n';
import moment from 'moment';
import en from './locales/en';
import fr from './locales/fr';

I18n.fallbacks = true;

I18n.translations = {
  en, // default
  fr,
};

function getDateLocale() {
  const locales = moment.locales();
  if (locales.includes(I18n.locale)) {
    return I18n.locale;
  }

  const [lang] = I18n.locale.split(/-|_/);
  if (locales.includes(lang)) {
    return lang;
  }

  return 'en';
}

I18n.setDateLocale = () => {
  moment.locale(getDateLocale());
};

export default I18n;
