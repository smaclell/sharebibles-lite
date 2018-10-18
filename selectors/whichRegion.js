import whichPolygon from 'which-polygon';
import { createSelector } from 'reselect';

const regions = createSelector((state) => state.regions, (data) => Object.values(data));

const geojson = createSelector(regions, (x) => x.map((r) => r.geojson));

export default createSelector(geojson, (featureCollection) => {
  let regionKey;
  for (let i = 0; i < featureCollection.length; i += 1) {
    regionKey = whichPolygon(featureCollection[i]);

    if (regionKey) break;
  }

  return regionKey;
}
);
