export const UploadStatus = {
  failed: 'failed',
  pending: 'pending',
  uploaded: 'uploaded',
  offline: 'offline',
};

export const UPLOADING_STATUS = 'UPLOADING_STATUS';
export const setUploadingStatus = status => ({
  type: UPLOADING_STATUS,
  status,
});

export const UPLOAD_UPDATED = 'UPLOAD_UPDATED';
const setup = status => key => ({
  type: UPLOAD_UPDATED,
  key,
  status,
});

export const failed = setup(UploadStatus.failed);
export const pending = setup(UploadStatus.pending);
export const uploaded = setup(UploadStatus.uploaded);
export const offline = setup(UploadStatus.offline);
