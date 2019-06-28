
export default abstract class Datable {
  private _location = '';

  constructor(location: string) {
    this._location = location;
  }

  public assign(data: object) {
    Object.assign(this, data);
  }
}
