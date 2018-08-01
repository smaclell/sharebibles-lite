import whichPolygon from 'which-polygon';
import { createSelector } from 'reselect';

const regions = createSelector(
  state => state.regions,
  data => Object.values(data),
);

const geojson = createSelector(
  regions,
  x => x.map(r => r.geojson),
);

export default createSelector(
  geojson,
  features => whichPolygon({
    type: 'FeatureCollection',
    features,
  }),
);
