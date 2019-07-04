import { storage } from '../app';
import BaseDatableStorage from './baseDatableStorage';
import Storage from './storage';
import axios from 'axios';

export { BaseDatableStorage };
export default class DatableStorage<T extends BaseDatableStorage> {

  public static async load<T extends BaseDatableStorage>(
    type: new (location: string) => T,
    location: string
  ): Promise<DatableStorage<T>> {
    const object = new DatableStorage<T>(type, location);
    await object.load();
    return object;
  }

  public static create<T extends BaseDatableStorage>(
    type: new (location: string) => T,
    location: string, data?: Partial<T>
  ): DatableStorage<T> {
    return new DatableStorage<T>(type, location, data);
  }

  public get data(): T {
    return this._data;
  }
  private _storage: Storage;
  private _data: T;

  constructor(type: new (location: string) => T, location: string, data?: Partial<T>) {
    this._storage = new Storage(location);
    if (data !== undefined) {
      this._data = new type(location);
      this._data.assign(data);
    } else {
      this._data = new type(location);
    }
  }

  public async save() {
    const data = JSON.stringify(this._data);
    try {
      await this._storage.uploadString(data);
    } catch (e) {
      console.error('[DatableStorage]', 'save failed');
      throw e;
    }
  }

  public async delete() {
    try {
      await this._storage.delete();
    } catch (e) {
      throw e;
    }
  }




  private async load() {
    const url = await this._storage.getDownloadURL();
    try {
      const data = (await axios.get(url)).data;
      this._data.assign(data);
    } catch (e) {
      console.error('[DatableStorage]', 'load falied');
      throw e;
    }
  }



}
