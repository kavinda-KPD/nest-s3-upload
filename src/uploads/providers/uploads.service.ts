import { Injectable } from '@nestjs/common';
import { UploadToAwsProvider } from './upload-to-aws.provider';

@Injectable()
export class UploadsService {
  constructor(private readonly uploadToAwsProvider: UploadToAwsProvider) {}

  async uploadFile(file: Express.Multer.File) {
    return this.uploadToAwsProvider.uploadFile(file);
  }
}
