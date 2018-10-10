import { Constants } from 'expo';
import refetch from '../../utils/refetch';
import * as actions from '../../actions/regions';

jest.mock('../../utils/refetch');
jest.mock('sentry-expo');

describe('actions/regions', () => {
  let dispatch;
  beforeEach(() => {
    Constants.manifest.extra = Constants.manifest.extra || {};
    Constants.manifest.extra.mapsUrl = 'mapsUrl';

    dispatch = jest.fn();
    refetch.mockClear();

    refetch.mockImplementation(async (url) => {
      if (url === 'mapsUrl/regions/GOOD') {
        return 'region';
      }

      if (url === 'mapsUrl/geojson/GOOD') {
        return 'geojson';
      }

      throw new Error(url);
    });
  });

  describe('request', () => {
    it('fetches the geojson data', async () => {
      await actions.request('GOOD')(dispatch);

      expect(refetch).toBeCalledWith('mapsUrl/geojson/GOOD', expect.objectContaining({ method: 'GET' }));
    });

    it('fetches the region metadata', async () => {
      await actions.request('GOOD')(dispatch);

      expect(refetch).toBeCalledWith('mapsUrl/regions/GOOD', expect.objectContaining({ method: 'GET' }));
    });

    it('saves the data to the state', async () => {
      await actions.request('GOOD')(dispatch);

      expect(dispatch).toBeCalledWith(actions.save('region', 'geojson'));
    });

    it('returns true after being successful', async () => {
      const result = await actions.request('GOOD')(dispatch);

      expect(result).toBe(true);
    });

    it('returns false if failing requests', async () => {
      const result = await actions.request('BAD')(dispatch);

      expect(result).toBe(false);
    });
  });
});
