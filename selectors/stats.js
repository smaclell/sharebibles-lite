import { createSelector } from 'reselect';
import { UploadStatus } from '../actions/uploads';

const getLocations = state => state.locations;
const getUploads = state => state.uploads;

const uploadEntries = createSelector(
  getUploads,
  data => Object.entries(data),
);

export const getFailedLocations = createSelector(
  [getUploads, uploadEntries, getLocations],
  (uploads, data, locations) => {
    const failedLocations = [];
    data.forEach(([key, v]) => {
      if (v.status === UploadStatus.failed && locations[key]) {
        const failed = locations[key];
        failed.error = uploads[key].error;
        failedLocations.push(failed);
      }
    });
    return failedLocations;
  },
);

export const getStats = (state) => {
  const stats = {
    [UploadStatus.pending]: 0,
    [UploadStatus.offline]: 0,
    [UploadStatus.failed]: 0,
    [UploadStatus.uploaded]: 0,
  };

  Object.values(state.uploads).forEach((v) => {
    stats[v.status] += 1;
  });

  return stats;
};
