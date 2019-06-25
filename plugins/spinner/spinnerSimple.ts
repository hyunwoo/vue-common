
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

declare module 'vue/types/vue' {
  interface SpinnerSimple {
    on: (message: string) => {};
    off: () => {};
  }
}

@Component({})
export default class SpinnerSimple extends Vue {
  public use: boolean = false;
  public message: string = '';

  public on(message: string) {
    this.message = message ? message : '';
    this.use = true;
  }

  public off() {
    this.use = false;
    this.message = '';
  }
}
