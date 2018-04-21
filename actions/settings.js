export const LOAD_SETTINGS = 'LOAD_SETTINGS';
export function load(settings) {
  return {
    type: LOAD_SETTINGS,
    settings,
  };
}
