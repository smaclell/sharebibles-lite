import * as actions from '../../actions/regions';
import reducer from '../../reducers/regions';

describe('reducers/regions', () => {
  it('initial state is an empty object', () => {
    const intiial = reducer(undefined, { type: '' });

    expect(intiial).toEqual({});
  });

  describe(actions.CLEAR, () => {
    it('resets to the intial state', () => {
      const action = actions.clear();

      const state = reducer('anything', action);

      expect(state).toEqual({});
    });
  });

  describe(actions.SAVE, () => {
    it('saves new data', () => {
      const action = actions.save({ regionKey: 'key', label: 'xyz' }, 'geojson');

      const state = reducer(undefined, action);

      expect(state).toEqual({
        key: {
          regionKey: 'key',
          metadata: { regionKey: 'key', label: 'xyz' },
          geojson: 'geojson',
        },
      });
    });

    it('overwrites data', () => {
      const action = actions.save({ regionKey: 'key', label: 'xyz' }, 'geojson');

      const state = reducer({ key: 'overwrite' }, action);

      expect(state).toEqual({
        key: {
          regionKey: 'key',
          metadata: { regionKey: 'key', label: 'xyz' },
          geojson: 'geojson',
        },
      });
    });

    it('appends data', () => {
      const action = actions.save({ regionKey: 'key', label: 'xyz' }, 'geojson');

      const state = reducer({ other: 'data' }, action);

      expect(state).toEqual({
        other: 'data',
        key: {
          regionKey: 'key',
          metadata: { regionKey: 'key', label: 'xyz' },
          geojson: 'geojson',
        },
      });
    });
  });
});
