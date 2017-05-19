const Dispatcher = require('url-dispatcher');
// import samplePage from './sample';

new Dispatcher({
  routes: {
    '/*:splat': function () {
      // samplePage(jQuery);
    },
  }
});
