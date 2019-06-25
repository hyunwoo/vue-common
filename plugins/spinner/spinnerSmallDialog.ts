import Vue from 'vue';
import { Component } from 'vue-property-decorator';

declare module 'vue/types/vue' {
  interface SpinnerSmallDialog {
    on: (message: string) => {};
    off: () => {};
  }
}

@Component({})
export default class SpinnerSmallDialog extends Vue {
  public use: boolean = false;
  public message: string = '선택된 N개의 파일이 삭제됩니dddd다';

  public on(message?: string) {
    this.message = message ? message : '';
    this.use = true;
  }

  public off() {
    this.use = false;
    this.message = '';
  }
}
