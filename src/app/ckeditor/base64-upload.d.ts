import { FileLoader } from "@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter";
import "@ckeditor/ckeditor5-upload/src/filerepository";

declare module "@ckeditor/ckeditor5-upload/src/filerepository" {
  interface FileRepository {
    createUploadAdapter(loader: FileLoader): any; // Specify the return type as needed
  }
}
