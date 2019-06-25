import Vue from 'vue';
import { Component, Watch, Prop } from 'vue-property-decorator';

declare module 'vue/types/vue' {
  interface Toast {
    open: (text: string) => void;
  }
}

@Component({})
export default class Toast extends Vue {
  private isOpen: boolean = false;
  private x: string | null = null; // null, left or right
  private y: string = 'bottom'; // bottom or top
  private timeout: number = 5000;
  private mode: string = ''; // vertical or multi-line
  private text: string = 'default text';

  public open(text: string) {
    this.text = text;
    this.isOpen = true;
  }
  public close() {
    this.isOpen = false;
    this.text = 'default text';
  }
}
