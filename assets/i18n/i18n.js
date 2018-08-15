import I18n from 'ex-react-native-i18n';
import moment from 'moment';
import de from './locales/de';
import en from './locales/en';
import es from './locales/es';
import fr from './locales/fr';
import ko from './locales/ko';
import nl from './locales/nl';
import th from './locales/th';
import ptBr from './locales/pt-br';
import zhCn from './locales/zh-cn';
import zhHk from './locales/zh-hk';

I18n.fallbacks = true;

I18n.translations = {
  en, // default
  de,
  es,
  fr,
  ko,
  nl,
  th,
  'pt-br': ptBr,
  'zh-cn': zhCn,
  'zh-hk': zhHk,
};

I18n.updateLocale = (locale) => {
  I18n.locale = (locale) ? locale.replace(/_/, '-') : '';
  I18n.setDateLocale();
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
