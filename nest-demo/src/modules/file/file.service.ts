import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
  async uploadone(file: any) {
    const filename = file.originalname;
    const filebuffer = file.buffer;
    const writefile = createWriteStream(
      join(__dirname, '../../../tmp/assets', `${filename}`),
    );
    writefile.write(filebuffer);
    return join(__dirname, '../../../tmp/assets', `${filename}`);
  }
}
