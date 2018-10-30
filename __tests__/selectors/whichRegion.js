import whichPolygon from 'which-polygon';
import selector from '../../selectors/whichRegion';

jest.mock('which-polygon');

describe('selectors/whichRegion', () => {
  beforeEach(() => {
    whichPolygon.mockClear();
    whichPolygon.mockImplementation((a) => a);
  });

  it('projects the geojson for each region', () => {
    const state = {
      regions: {
        a: {
          geojson: 'a',
        },
        b: {
          geojson: 'b',
        },
      },
    };

    const selected = selector(state);

    expect(selected).toEqual({
      type: 'FeatureCollection',
      features: 'a',
    });
  });

  it('memoizes the value', () => {
    const regions = {};

    const first = selector({ a: 1, regions });
    const second = selector({ a: 2, regions });

    expect(first).toBe(second);
  });
});
