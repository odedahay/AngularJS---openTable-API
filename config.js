module.exports = {
  projectId: 'nodeapp-186415',
  keyFilename: './key.json',
  bucketName: '[your Google Cloud Storage bucket name]',
  cookieSecret: '[cooking signing key]',
  oauth2: {
    clientId: '114655556703231697112',
    clientSecret: '[Client Secret for web application credentials]',
    redirectUrl: process.env.REDIRECT_URL || 'http://localhost:8080/oauth2callback'
  }
};
