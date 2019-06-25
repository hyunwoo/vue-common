import Vue from 'vue';
import SpinnerSimple from './spinnerSimple';
import SpinnerDialog from './spinnerDialog';
import SpinnerSmallDialog from './spinnerSmallDialog';

declare module 'vue/types/vue' {
  interface Vue {
    $spinnerSimple: SpinnerSimple;
    $spinnerDialog: SpinnerDialog;
    $spinnerSmallDialog: SpinnerSmallDialog;
  }
}

export default {
  install(vue: typeof Vue, options: any) {
    if (Vue.prototype.$spinnerSimple !== undefined) {
      Vue.prototype.$spinnerSimple.destroy();
    }

    if (Vue.prototype.$spinnerDialog !== undefined) {
      Vue.prototype.$spinnerDialog.destroy();
    }

    const simpleProgressInstance = new SpinnerSimple();
    const dialogProgressInstance = new SpinnerDialog();
    const smallProgressInstance = new SpinnerSmallDialog();

    simpleProgressInstance.$mount(document.body.appendChild(document.createElement('div')));
    dialogProgressInstance.$mount(document.body.appendChild(document.createElement('div')));
    smallProgressInstance.$mount(document.body.appendChild(document.createElement('div')));

    Vue.prototype.$spinnerSimple = simpleProgressInstance;
    Vue.prototype.$spinnerDialog = dialogProgressInstance;
    Vue.prototype.$spinnerSmallDialog = smallProgressInstance;

  }
};
