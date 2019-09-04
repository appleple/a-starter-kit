import { library, dom, config } from '@fortawesome/fontawesome-svg-core';
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

/**
 * fontawesome5
 *
 * 必要なアイコンのみインポートして、library.add で追加します。命名規則はクラス名（ケバブケース）をキャメルケースにしたものです。
 * e.g. <i class="fas fa-sign-out-alt"></i>   -->   faSignOutAlt
 * IconList: https://fontawesome.com/icons
 */
export default () => {
  config.searchPseudoElements = false;
  library.add(faUser, faSignOutAlt, faFacebook, faTwitter, faInstagram);
  dom.watch();
};
