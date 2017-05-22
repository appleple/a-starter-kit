// import samplePage from './sample';

const Dispatcher = require('url-dispatcher');

const dispatcher = new Dispatcher({
 routes: {
  /**
   * サンプルページ
   */
  '/*': () => {
  // samplePage(jQuery);
}
}
});

ACMS.Ready(() => {
 /**
  * dun dispatch
  */
 dispatcher.run(location.href);
});
