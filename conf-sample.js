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
  },
  scripts: {
    'head': [
      'http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js',
      //'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.14/jquery-ui.min.js', 
      //'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.1.7/underscore-min.js',
      //'http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.5.1/backbone-min.js',
      //'http://cdnjs.cloudflare.com/ajax/libs/socket.io/0.7.0/socket.io.min.js', 
      //'http://html5shim.googlecode.com/svn/trunk/html5.js',     
    ],
    'footer': [
      '/js/script.js'       
    ]
  }
};