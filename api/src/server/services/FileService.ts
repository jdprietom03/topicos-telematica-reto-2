import fs from 'fs';
import path from 'path';

interface FileInfo {
  name: string;
  size: number;
  timestamp: number;
}

export default class FileService {
  private dirPath: string;

  constructor() {
    this.dirPath = './data';
  }

  private getFileStats(filePath: string): FileInfo {
    const stats = fs.statSync(filePath);
    return {
      name: path.basename(filePath),
      size: stats.size,
      timestamp: parseInt(stats.mtimeMs.toString()),
    };
  }

  public listFiles(): FileInfo[] {
    try {
      const files = fs.readdirSync(this.dirPath);

      return files.map((file) =>
        this.getFileStats(path.join(this.dirPath, file)),
      );
    } catch (err) {
      console.log(err);
      throw new Error('Error al listar archivos: ' + err);
    }
  }

  public findFileByName(pattern: string): FileInfo[] {
    try {
      const files = fs.readdirSync(this.dirPath);
      const regex = new RegExp(pattern.replace(/\*/g, '.*'));

      return files
        .filter((file) => regex.test(file))
        .map((file) => this.getFileStats(path.join(this.dirPath, file)));
    } catch (err) {
      console.log(err);
      throw new Error('Error al buscar archivos: ' + err);
    }
  }
}
