import I18n from 'ex-react-native-i18n';
import moment from 'moment';
import de from './locales/de';
import en from './locales/en';
import es from './locales/es';
import ko from './locales/ko';
import th from './locales/th';
import ptBr from './locales/pt-br';
import zhCn from './locales/zh-cn';

I18n.fallbacks = true;

I18n.translations = {
  en, // default
  de,
  es,
  ko,
  th,
  'pt-br': ptBr,
  'zh-cn': zhCn,
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
