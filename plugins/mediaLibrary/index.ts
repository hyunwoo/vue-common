import Vue from 'vue';
import MediaLibraryVue from './mediaLibrary.vue';
import MediaLibrary from './mediaLibrary';
import { MediaShortItem, EmbedMediaItem } from './mediaLibrary';
import MediaItem from './mediaItem';


export {
  MediaItem, MediaShortItem, EmbedMediaItem
};

declare module 'vue/types/vue' {
  interface Vue {
    $mediaLibrary: MediaLibrary;
  }
}

export default {
  install(vue: typeof Vue, opts: any) {
    if (Vue.prototype.$mediaLibrary !== undefined) {
      Vue.prototype.$mediaLibrary.$destroy();
    }
    const instance = new MediaLibraryVue();
    Vue.prototype.$mediaLibrary = instance;
    instance.$mount(document.body.appendChild(document.createElement('div')));
    console.warn('MEDIA LIBRARY INSTALLED');
  }
};
