import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadsService {
    constructor() {}

    async uploadFile(file: Express.Multer.File) {
        return {
            originalname: file.originalname,
            filename: file.filename,
        };
    }
}
