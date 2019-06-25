import { FirestoreDocumentData } from '../../firebase';

export interface MediaType {
  type: string[];
}


const mediaTypes: { [key: string]: string[] } = {
  Image: ['image/jpeg', 'image/png'],
  Video: ['video/mpeg', 'video/mp4'],
  Pdf: ['application/pdf']
};
export { mediaTypes as MediaTypes };

export default class MediaItem extends FirestoreDocumentData {
  public mid: string = '';
  public name: string = '';
  public uid: string = '';
  public createdAt: string = '';
  public references: string[] = [];
  public mediaURL: string = '';
  public type: string = 'image/jpeg';

}
