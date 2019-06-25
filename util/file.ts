import _ from 'lodash';

class FileUtil {
  private fileReader: FileReader = new FileReader();

  public getFilesFromEvent(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
    if (event.dataTransfer === null) {
      throw new Error('data transfer is null');
    }

    const files: File[] = [];
    for (let i = 0; i < event.dataTransfer.files.length; i++) {
      const item = event.dataTransfer.files.item(i);
      if (item === null) {
        continue;
      }
      files.push(item);
    }
    return files;
  }

  public readFile(
    inputFile: File,
    type?: 'DataURL' | 'Text' | 'BinaryString'
  ): Promise<string> {
    const exportType = type ? type : 'Text';
    return new Promise((resolve, reject) => {
      this.fileReader.onload = result => {
        if (this.fileReader.result === null) {
          reject(new Error('empty file result'));
        } else {
          resolve(this.fileReader.result as string);
        }
      };
      switch (exportType) {
        case 'DataURL':
          this.fileReader.readAsText(inputFile);
          break;
        case 'Text':
          this.fileReader.readAsDataURL(inputFile);
          break;
        case 'BinaryString':
          this.fileReader.readAsBinaryString(inputFile);
          break;
      }
    });
  }

  public readFileAsArrayBuffer(inputFile: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      this.fileReader.onload = result => {
        if (this.fileReader.result === null) {
          reject(new Error('empty file result'));
        } else {
          resolve(this.fileReader.result as ArrayBuffer);
        }
      };
      this.fileReader.readAsArrayBuffer(inputFile);
    });
  }
}

const file = new FileUtil();
export default file;
