import whichPolygon from 'which-polygon';
import { createSelector } from 'reselect';

const regions = createSelector((state) => state.regions, (data) => Object.values(data));

const geojson = createSelector(regions, (x) => x.map((r) => r.geojson));

export default createSelector(geojson, (featureCollection) => {
  let regionKey = null;

  for (let i = 0; i < featureCollection.length && !regionKey; i += 1) {
    if (featureCollection[i].type && featureCollection[i].type === 'FeatureCollection') {
      console.log('took new');
      regionKey = whichPolygon(featureCollection[i]);
    } else {
      console.log('took old', JSON.stringify(featureCollection[i]));
      regionKey = whichPolygon({
        type: 'FeatureCollection',
        features: [featureCollection[i]],
      });
    }
  }

  return regionKey;
});
