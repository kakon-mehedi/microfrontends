export class Base64ImgUploadAdapter {
    loader: any;

    constructor(loader: any) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file
            .then((file: File) => new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = () => {
                    resolve({ default: reader.result as string });
                };

                reader.onerror = error => {
                    reject(error);
                };

                reader.readAsDataURL(file); // Converts the image to base64
            }));
    }

    abort() {
        // Handle if the upload is aborted (optional).
    }
}
