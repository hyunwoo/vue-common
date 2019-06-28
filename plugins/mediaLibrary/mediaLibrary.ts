import { Vue, Component } from 'vue-property-decorator';
import { FirestoreCollection, FirestoreDocument, Storage } from '../../firebase';
import MediaItem from './mediaItem';
import uuid from 'uuid/v4';
import _ from 'lodash';
import { File, Log } from '../../util';


interface EmbedMediaItem {
  id: string;
  type: string;
  URL: string;
  name: string;
}

type MediaShortItem = EmbedMediaItem;

export { EmbedMediaItem, MediaShortItem };
// export interface EmbedMedia {
//   text: string;
//   type: string;
//   URL: string;
// }
const storageRoot = '/mediaLibrary';
@Component({})
export default class MediaLibrary extends Vue {
  private limitLength: number = 20;
  private selects: string[] = [];
  private items: Array<FirestoreDocument<MediaItem>> = [];
  private collection: FirestoreCollection<MediaItem> = new FirestoreCollection<MediaItem>('/media');
  private uid!: string;
  private ui = {
    open: false,
    dragOver: false,
    loading: false,
    loadingMessage: '',
    searchModel: '',
    mediaFilter: ['Image'],
    selectFilter: 'All',
    disableFilter: true,
    disableSelectFilter: true,
    displaySelected: true,
    defaultFilterValue: ['Image']
  };

  public open(uid: string, selects: string[], accepts?: Array<('Image' | 'Pdf' | 'Video')>): Promise<EmbedMediaItem[]> {
    this.ui.loading = true;
    this.uid = uid;
    this.selects = selects;
    this.ui.open = true;
    if (accepts) {
      this.ui.mediaFilter = accepts;
      this.ui.disableFilter = true;
    } else {
      this.ui.mediaFilter = ['Image', 'Video', 'Pdf'];
      this.ui.disableFilter = false;
    }

    this.collection.createQuery('uid', '==', uid)
      .orderBy('createdAt', 'asc')
      .exec(MediaItem)
      .then(items => {
        this.items = items;
        // TODO 필요한지 판단
        // _.forEach(this.items, item => {
        //   // Migration => image type undef to image
        //   if (item.data.type === undefined ||

        //     // @ts-ignore
        //     item.data.type === '') {
        //     console.log(item.data);
        //     item.data.type = 'Image';
        //     item.save();
        //   }
        // });
        console.log(items);
        this.ui.loading = false;
      })
      .catch(e => {
        // TODO Error Message Display
        console.error(e);
        this.ui.loading = false;
      });

    return new Promise<EmbedMediaItem[]>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
  private resolve = (results: EmbedMediaItem[]) => { /** empty */ };
  private reject = () => { /** emtpy */ };


  private changeMediaFilter() {
    console.log(this.ui.mediaFilter);
  }
  private get displayItems() {
    const filter: { [key: string]: boolean } = {
      Image: _.some(this.ui.mediaFilter, f => f === 'Image'),
      Video: _.some(this.ui.mediaFilter, f => f === 'Video'),
      Pdf: _.some(this.ui.mediaFilter, f => f === 'Pdf')
    };
    console.log('Media Libary Filter', filter);
    return _(this.items).filter(item => {
      return item.data.name === '' ? true : item.data.name.indexOf(this.ui.searchModel) !== -1;
    }).filter(item => {
      if (item.data.type === 'video/mp4') {
        return filter.Video;
      } else if (item.data.type === 'application/pdf') {
        return filter.Pdf;
      } else {
        return filter.Image;
      }

    }).filter(item => {
      switch (this.ui.selectFilter) {
        case 'All':
          return true;
        default:
          const exist = _.some(this.selects, s => s === item.data.mid);
          return this.ui.selectFilter === 'Selected' ? exist : !exist;
      }

    }).value();
  }
  private onResolve() {
    this.ui.open = false;
    const result = _(this.selects).map(s => {
      const o = _.find(this.items, item => item.id === s);
      if (o === undefined) {
        return undefined;
      } else {
        return {
          id: o.id,
          type: o.data.type,
          URL: o.data.mediaURL,
          name: o.data.name,
        };
      }
    })
      .filter(out => out !== undefined)
      .value();
    if (result === undefined) {
      this.resolve([]);
    } else {
      // @ts-ignore checked undefined
      this.resolve(result);
    }
  }

  private onReject() {
    this.ui.open = false;
    this.reject();
  }
  private dropMedia(evt: DragEvent) {
    // TODO
    // 왜 페이지가 이동하는가..?
    evt.preventDefault();
    const files = File.getFilesFromEvent(evt);
    console.log(files);

    evt.stopImmediatePropagation();
    return false;
  }

  private uploadMedia() {
    const inputElement = document.createElement('INPUT');
    inputElement.setAttribute('type', 'file');
    inputElement.setAttribute('accept', '.gif, .jpg, .png, .pdf, .mp4');
    inputElement.setAttribute('multiple', '');
    document.body.appendChild(inputElement);

    inputElement.click();
    inputElement.oncancel = e => {
      this.ui.loading = false;
      inputElement.remove();
    };
    inputElement.onchange = async e => {
      this.ui.loading = true;
      this.ui.loadingMessage = `uploading...`;
      if (e.target === null) {
        return;
      }
      const target: HTMLInputElement = e.target as HTMLInputElement;
      if (target.files === null) {
        return;
      }
      for (let i = 0; i < target.files.length; i++) {
        const file: File | null = target.files.item(i);
        if (file === null) {
          continue;
        }
        this.ui.loadingMessage = `uploading... ${i + 1}/${target.files.length}`;
        try {
          if (file.size > 1024 * 1024 * 30) {
            alert('30mb가 초과하는 파일은 업로드 할 수 없습니다.');
            continue;
          }
          console.log(file.type);
          const media = this.collection.create(MediaItem);
          const storage = new Storage(`/${storageRoot}/${media.id}`);
          await storage.upload(file);
          const url = await storage.getDownloadURL();
          media.data.name = file.name;
          media.data.uid = this.uid;
          media.data.mid = media.id;
          media.data.references = [];
          media.data.mediaURL = url;
          media.data.createdAt = new Date().toUTCString();
          media.data.type = file.type;
          await media.saveSync();
          this.items.push(media);
        } catch (e) {
          Log.warn('[Media Library]', file.name, 'upload failed');
        }


      }
      this.ui.loading = false;

      inputElement.remove();
    };
  }

  private isSelected(item: FirestoreDocument<MediaItem>) {
    return _.some(this.selects, s => s === item.id);
  }
  private async deleteMedia(item: FirestoreDocument<MediaItem>) {
    this.ui.loading = true;
    this.ui.loadingMessage = '';
    const storage = new Storage(`/${storageRoot}/${item.id}`);
    await storage.delete();
    await item.delete();
    const index = _.findIndex(this.items, i => i.id === item.id);
    const selectIndex = _.findIndex(this.selects, s => s === item.id);
    this.selects.splice(selectIndex, 1);
    this.items.splice(index, 1);
    this.ui.loading = false;

  }
  private clickMedia(item: FirestoreDocument<MediaItem>) {
    const exist = _.some(this.selects, s => s === item.id);
    if (!exist) {
      this.selects.push(item.id);
    } else {
      const idx = _.findIndex(this.selects, s => s === item.id);
      this.selects.splice(idx, 1);
    }
    console.log(exist);
  }
}
