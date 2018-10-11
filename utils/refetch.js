/* global fetch */
export default async function refetch(url, options) {
  const params = Object.assign({ headers: {} }, options);

  params.headers['content-type'] = 'application/json';

  const response = await fetch(url, params);

  let values;

  try {
    if (response.status !== 204) {
      values = await response.json();
    }
  } catch (e) {
    values = {};
  }

  if (!response.ok) {
    const error = new Error(`Response was not okay when calling: ${url}`);
    error.status = response.status;
    error.reason = values.error || values.message || 'unknown';
    throw error;
  }

  return values;
}
