import * as process from 'process';

export default () => ({
  server: {
    host: process.env.APP_HOST || '0.0.0.0',
    port: process.env.APP_PORT || 3001,
  },
  mongodb: {
    url: process.env.MONGODB_CONNECTION_STRING,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  google: {
    topics: {
      cdcProductTopic: process.env.CDC_PRODUCT_TOPIC,
    },
    subscriptions: {
      cdcProductSubscription: process.env.CDC_PRODUCT_SUBS,
    },
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
  elasticSearch: {
    CONFIG: {
      NODE:
        process.env.ELASTICSEARCH_NODE ||
        'https://c017a7a2e54e4a8282e94b6c02601e46.asia-southeast1.gcp.elastic-cloud.com:9243',
      USERNAME: process.env.ELASTICSEARCH_USERNAME || 'pops-app',
      PASSWORD: process.env.ELASTICSEARCH_PASSWORD || 'EPi6E4ZzbYc73dAjvTBc',
      INDEX: 'enrolled_info_dashboard',
    },
    DOCUMENT_TYPES: {
      USER_ENROLLMENT_INFO: 'UserEnrolledInfo',
    },
  },
});
