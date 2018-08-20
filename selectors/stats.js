import { createSelector } from 'reselect';
import { UploadStatus } from '../actions/uploads';

const uploads = createSelector(
  state => state.uploads,
  data => Object.entries(data),
);

const getLocations = state => state.locations;

// const getStat = (data, value) => {
//   // console.log(data);
//   // return data.reduce((total, [key, v]) => (v === UploadStatus[value] ? total + 1 : total), 0);
//   return data.reduce((total, item) => {
//     console.log(item[1], value);
//     return (item[1] === UploadStatus[value] ? total + 1 : total);
//   }, 0);
// };

export const getStats = value => createSelector(
  uploads,
  (data, v) => {
    // console.log(data);
    // return data.reduce((total, [key, v]) => (v === UploadStatus[value] ? total + 1 : total), 0);
    return data.reduce((total, item) => {
      console.log(item[1], v);
      return (item[1] === UploadStatus[v] ? total + 1 : total);
    }, 0);
  }
);

export const getFailedLocations = createSelector(
  [uploads, getLocations],
  (data, locations) => {
    const failedLocations = [];
    data.forEach(([key, v]) => {
      if (v === UploadStatus.failed && locations[key]) {
        failedLocations.push(locations[key]);
      }
    });
    return failedLocations;
  },
);
