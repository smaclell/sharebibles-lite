export const UploadStatus = {
  failed: 'failed',
  pending: 'pending',
  uploaded: 'uploaded',
};

export const UPLOAD_UPDATED = 'UPLOAD_UPDATED';
const setup = status => key => ({
  type: UPLOAD_UPDATED,
  key,
  status,
});

export const failed = setup(UploadStatus.failed);
export const pending = setup(UploadStatus.pending);
export const uploaded = setup(UploadStatus.uploaded);
