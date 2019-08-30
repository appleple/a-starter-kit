import './lib/polyfill';
import domContentLoaded from 'dom-content-loaded';
import fonts from './fonts';
// import Dispatcher from 'a-dispatcher';
// import examplePage from './example';

/**
 * スタイルの読み込み
 */
import '../scss/site.scss';

/**
 * Content Ready
 */
domContentLoaded(async () => {

});

/**
 * Dynamic Import
 */
(async () => {
  // トップページ
  if (window.location.pathname === '/') {
    const top = await import(/* webpackChunkName: "top" */'./containers/top');
    top.default();
  }
})();

/**
 * FontAwesome 5
 */
fonts();
