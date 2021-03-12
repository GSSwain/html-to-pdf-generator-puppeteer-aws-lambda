import { createReadStream } from 'fs';
export default class FileService {
  static getReadStream(filePath) {
    return createReadStream(filePath);
  }

}