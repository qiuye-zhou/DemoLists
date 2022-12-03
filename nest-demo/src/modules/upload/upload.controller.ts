import {
  Controller,
  Get,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { Response } from 'express';
import { zip } from 'compressing';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  @Post('upload')
  @UseInterceptors(FilesInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return 'ok';
  }

  //下载静态资源共享里面的文件
  @Get('static')
  download(@Res() res: Response) {
    const url = join(__dirname, '../../uploadcs/1666099155763.jpg');
    res.download(url);
  }

  //流方式下载文件
  @Get('stream')
  async stream(@Res() res: Response) {
    const url = join(__dirname, '../../uploadcs/1666099155763.jpg');
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename=downloadcs`);

    //返回的是流文件，前端需要解析一下
    //下载的是zip文件
    tarStream.pipe(res);
  }
}

//前端转换方式
//axios responseType ArrayBuffer Blob
// const useFetch = (url: string) => {
//   const res = await fetch(url).then((res) => res.arrayBuffer());
//   const blob = new Blob([res]);
//   const Url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = Url;
//   a.download = 'cscs.zip';
//   a.click();
// };
// const download = () => {
//   useFetch('http://localhost:3000/upload/stream');
//   //upload  window.open(http://localhost:3000/upload/upload)
// };
