const logging = true;

export default class Log {
  public static log(thisObject: any, ...arg: any[]) {
    if (!logging) {
      return;
    }
    let type;
    try {
      type = thisObject.baseType;
      if (type === undefined) {
        console.log(this, arg);
      } else {
        console.log(`[${type}]`, ...arg);
      }
    } catch (e) {
      console.log(this, arg);
    }
  }
  public static warn(thisObject: any, ...arg: any[]) {
    if (!logging) {
      return;
    }
    let type;
    try {
      type = thisObject.baseType;
      if (type === undefined) {
        console.warn(this, arg);
      } else {
        console.warn(`[${type}]`, ...arg);
      }
    } catch (e) {
      console.warn(this, arg);
    }
  }
  public static error(thisObject: any, ...arg: any[]) {
    if (!logging) {
      return;
    }
    let type;
    try {
      type = thisObject.baseType;
      if (type === undefined) {
        console.error(this, arg);
      } else {
        console.error(`[${type}]`, ...arg);
      }
    } catch (e) {
      console.error(this, arg);
    }
  }
}
