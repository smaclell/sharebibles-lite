import { SecureStore } from 'expo';

describe('utils/database', () => {
  let LOCATION_UPLOADED;
  let convertToLocation;
  beforeEach(() => {
    SecureStore.setItemAsync = jest.fn().mockResolvedValue();
    SecureStore.getItemAsync = jest.fn().mockResolvedValue('{}');
    SecureStore.deleteItemAsync = jest.fn().mockResolvedValue();

    const imported = require('../../utils/database');
    convertToLocation = imported.convertToLocation; // eslint-disable-line prefer-destructuring
    LOCATION_UPLOADED = imported.LOCATION_UPLOADED; // eslint-disable-line prefer-destructuring
  });

  describe('convertToLocation', () => {
    it('loads the location for the key', async () => {
      SecureStore.getItemAsync.mockReturnValue(Promise.resolve('{ "longitude": 1, "latitude": 2 }'));

      const result = await convertToLocation({
        key: 'k',
        createdAt: 123,
        resources: '{}',
        status: 'any',
        uploaded: LOCATION_UPLOADED.false,
      });

      expect(result.longitude).toBe(1);
      expect(result.latitude).toBe(2);
    });

    it('rehydrates the resources', async () => {
      const result = await convertToLocation({
        key: 'k',
        createdAt: 123,
        resources: '{ "generic_bible": { "given": 1 }}',
        status: 'any',
        uploaded: LOCATION_UPLOADED.false,
      });

      expect(result.resources).toEqual({
        generic_bible: {
          given: 1,
        },
      });
    });

    it('is uploaded', async () => {
      const result = await convertToLocation({
        key: 'k',
        createdAt: 123,
        resources: '{ "generic_bible": { "given": 1 }}',
        status: 'any',
        uploaded: LOCATION_UPLOADED.true,
      });

      expect(result.uploaded).toBe(true);
    });

    it('is not uploaded', async () => {
      const result = await convertToLocation({
        key: 'k',
        createdAt: 123,
        resources: '{ "generic_bible": { "given": 1 }}',
        status: 'any',
        uploaded: LOCATION_UPLOADED.false,
      });

      expect(result.uploaded).toBe(false);
    });
  });
});
