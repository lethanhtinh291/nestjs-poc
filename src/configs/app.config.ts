export default () => ({
  server: {
    host: process.env.APP_HOST || '0.0.0.0',
    port: process.env.APP_PORT || 3001,
  },

  google: {
    serviceAccountPath: process.env.GOOGLE_PATH_SERVICE_ACCOUNT,
    drive: {
      auth: {
        scopes: (
          process.env.GOOGLE_DRIVE_AUTH_SCOPES ||
          'https://www.googleapis.com/auth/drive'
        ).split(','),
      },
      folderUploadReport: process.env.GOOGLE_DRIVE_FOLDER_UPLOAD_REPORT,
      share: {
        users: (process.env.GOOGLE_DRIVE_FOLDER_SHARE_USERS || '').split(','),
      },
    },
  },
});
