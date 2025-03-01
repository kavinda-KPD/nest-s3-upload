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

      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get<string>('AWS_PUBLIC_BUCKET_NAME'),
          Key: this.generateFileName(file),
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();

      return uploadResult.Key;
    } catch (error) {
      throw new Error(error);
    }
  }

  private generateFileName(file: Express.Multer.File) {
    if (!file.originalname) {
      throw new Error('File original name is missing');
    }

    let name = file.originalname.split('.')[0];
    name = name.replace(/\s/g, '').trim();

    const extension = file.originalname.split('.').pop();
    const timeStamp = Date.now().toString().trim();

    return `${name}-${timeStamp}.${extension}`;
  }
}
