import Plugin from "@ckeditor/ckeditor5-core/src/plugin";
import { FileLoader } from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter";
import FileRepository from "@ckeditor/ckeditor5-upload/src/filerepository";

export default class Base64UploadAdapter extends Plugin {
  static get requires() {
    return [FileRepository];
  }

  static get pluginName() {
    return "Base64UploadAdapter";
  }

  init() {
    const editor = this.editor;
    editor.plugins.get(FileRepository).createUploadAdapter = (
      loader: FileLoader
    ) => new Adapter(loader);
  }
}

class Adapter {
  private loader: FileLoader;
  private file: File | null = null;
  private reader: FileReader | null = null;

  constructor(loader: FileLoader) {
    this.loader = loader;
  }

  upload(): Promise<{ default: string }> {
    return new Promise((resolve, reject) => {
      this.reader = new FileReader();

      this.reader.onload = () => {
        if (this.file && this.reader) {
          this.loader.uploadTotal = this.loader.uploaded = this.file.size;
          resolve({ default: this.reader.result as string });
        }
      };

      this.reader.onerror = (err) => {
        this.file = null;
        reject(err);
      };

      this.reader.onabort = () => {
        this.file = null;
        reject();
      };

      this.loader.file.then((file: File) => {
        this.file = file;
        this.reader?.readAsDataURL(this.file);
      });
    });
  }

  abort() {
    if (this.reader) {
      this.reader.abort();
    }
  }
}
