import Dispatcher from 'a-dispatcher';
import samplePage from './sample';

const dispatcher = new Dispatcher();

dispatcher.addRoute('^/sample', samplePage);

ACMS.Ready(() => {
  /**
   * dun dispatch
   */
  dispatcher.run(location.pathname);
});
