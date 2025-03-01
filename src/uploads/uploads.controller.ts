import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('uploads')
export class UploadsController {
  constructor() {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('/file')
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

    return {
      originalname: file.originalname,
      filename: file.filename,
    };
  }
}
