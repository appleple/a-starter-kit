import Dispatcher from 'a-dispatcher';
import samplePage from './sample';
import { library, dom, config } from '@fortawesome/fontawesome-svg-core';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faFacebook, faTwitter, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';

import '../scss/site.scss'; // styleの読み込み

/**
 * ルーティング設定
 */
const dispatcher = new Dispatcher();
dispatcher.addRoute('^/sample', samplePage); 
dispatcher.run(location.pathname);

/**
 * fontawesome5
 * 必要なアイコンのみインポートして、library.add で追加します。命名規則はクラス名（ケバブケース）をキャメルケースにしたものです。
 * e.g. <i class="fas fa-sign-out-alt"></i>   -->   faSignOutAlt
 * IconList: https://fontawesome.com/icons
 */
config.searchPseudoElements = true;
library.add(faUser, faSignOutAlt, faFacebookSquare, faFacebook, faTwitter, faInstagram, faGithub);
dom.watch();

/**
 * Content Ready
 */
ACMS.Ready(() => {
  
});
