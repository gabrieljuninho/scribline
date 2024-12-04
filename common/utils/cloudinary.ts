export class CloudinaryError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "UploadServicesError";
  }
}
