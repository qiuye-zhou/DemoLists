import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService],
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../../uploadcs'),
        filename: (_, file, callback) => {
          const filename = `${
            new Date().getTime() + extname(file.originalname)
          }`;
          return callback(null, filename);
        },
      }),
    }),
  ],
})
export class UploadModule {}
