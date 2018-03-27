import I18n from '../assets/i18n/i18n';

export default I18n;

export const UPDATE_LOCALE = 'UPDATE_LOCALE';
export const updateLocale = locale => (dispatch) => {
  I18n.updateLocale(locale);

  dispatch({
    type: UPDATE_LOCALE,
    locale,
  });
};
