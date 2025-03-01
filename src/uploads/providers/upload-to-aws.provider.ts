import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import path from 'node:path';

@Injectable()
export class UploadToAwsProvider {
  constructor(private readonly configService: ConfigService) {}

  public async uploadFile(file: Express.Multer.File) {
    try {
      const s3 = new S3();

      file.filename = this.genarateFileName(file);

      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get('appConfig.awsBucketName'),
          Key: file.filename,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();

      return uploadResult.Key;
    } catch (error) {
      throw new Error(error);
    }
  }

  private genarateFileName(file: Express.Multer.File) {
    let name = file.originalname.split('.')[0];

    name.replace(/\s/g, '').trim();

    let extension = path.extname(file.originalname);

    let timeStamp = Date.now().toString().trim();

    return `${name}-${timeStamp}${extension}`;
  }
}
