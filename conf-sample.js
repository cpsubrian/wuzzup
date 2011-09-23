/**
 * Application Settings.
 */
module.exports = {
  port: 3001,
  hostname: 'http://wuzzup.brianthomaslink.com',
  title: 'Wuzzup',
  session: {
    secret: 'your secret here'
  },
  mongodb: {
    uri: {
      development: 'mongodb://localhost/wuzzup_dev',
      test: 'mongodb://localhost/wuzzup_test',
      production: 'mongodb://localhost/wuzzup'
    }
  },
  auth: {
    twitter: {
      consumerKey: 'your twitter oath key',
      consumerSecret: 'your twitter oath secret'
    }
  }
};
