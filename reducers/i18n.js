import I18n from '../assets/i18n/i18n';
import { UPDATE_LOCALE } from '../actions/i18n';

const initial = {
  locale: I18n.locale,
};

export default function reducer(state = initial, action) {
  if (action.type === UPDATE_LOCALE) {
    return {
      ...state,
      locale: action.locale,
    };
  }

  return state;
}
