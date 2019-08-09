import Vue from 'vue';
import App from './components/example';

export default () => {
  new Vue({
    el: '#js-vue-example',
    template: '<App/>',
    components: { App }
  });
};
