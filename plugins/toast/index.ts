import Vue from 'vue';
import Toast from './toast';

declare module 'vue/types/vue' {
  interface Vue {
    $toast: Toast;
  }
}

export default {
  install(vue: typeof Vue, opts: any) {
    if (Vue.prototype.$toast !== undefined) {
      Vue.prototype.$toast.$destroy();
    }
    const instance = new Toast();
    Vue.prototype.$toast = instance;
    instance.$mount(document.body.appendChild(document.createElement('div')));
  }
};
