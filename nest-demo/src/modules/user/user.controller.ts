import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  // Logger,
  Post,
  Query,
  // Redirect,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { Auth } from 'src/common/decorator/auth.decorator';
import { Role } from 'src/common/decorator/role.decorator';
import { FileService } from './../file/file.service';
import { UserdataService } from './../userdata/userdata.service';
import { UserService } from './user.service';
import { JWTService } from './../../processors/helper/helper.jwt.service';
import { AuthJwt } from 'src/common/decorator/authjwt.decorator';
import { Logger } from 'src/utils/loger.utile';
import { CatUser } from './catUser.dto';
import { CsDto } from './cs.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CannotFindMessage } from '../../exceptions/coustom.exception';

declare module 'express' {
  export interface Request {
    session: any;
  }
}

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private fileservice: FileService,
    private userdataService: UserdataService,
    private user: UserService,
    private readonly jwtservice: JWTService,
  ) {}

  @Get('csdirect')
  // 可以这样重定向
  // @Redirect('/user/csinterceptor', 302)
  async csred(@Res() res: Response, @Query('version') version: number) {
    if (version && version == 5) {
      // version == 5 重定向到下面路径
      return res.redirect('/user/csinterceptor');
    }
    // 否则重定向
    return res.redirect('/user/csexception');
  }

  @Get('cscustom')
  async cscustom() {
    throw new CannotFindMessage();
  }

  @Get('csressend')
  async csressend() {
    throw new HttpException(
      {
        status: HttpStatus.ACCEPTED,
        error: '这是自定义的202信息',
      },
      HttpStatus.ACCEPTED,
    );
  }

  @Get('csinterceptor')
  async csintercptor() {
    return {
      data1: '成功1',
      data2: '成功2',
    };
  }

  @Get('csexception')
  async csexceprion() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: '这是自定义的403信息',
      },
      HttpStatus.FORBIDDEN,
    );
    return 'csexception';
  }

  @Get('csredis')
  async csredis() {
    // this.cacheService.set('cs', 'cs22');
    return 'cs';
  }

  @Get('getjwt')
  getjwt(@Query('id') id: string) {
    const token = this.jwtservice.sign(id, 'authjwt');
    Logger.log('cs');
    Logger.info('cs');
    Logger.debug('cs');
    Logger.warn('cs');
    Logger.error('cs');
    Logger.fatal('cs');
    Logger.access('cs');
    return token;
  }

  @Get('ver')
  vertoken(@Req() request: Request) {
    const req = request.headers.authorization;
    const verres = this.jwtservice.verify(req);
    return verres;
  }

  @Get('authjwt')
  @AuthJwt(['authjwt'])
  async authjwt() {
    return 'ok';
  }

  @Get('cspipe')
  cspipe(@Body() catUser: CatUser) {
    console.log(catUser);

    return 'cs';
  }

  @Get('cspipeip')
  cspipeip(@Body() csdto: CsDto) {
    console.log(csdto);

    return 'cs';
  }

  @Get('cssession')
  async getcssession(@Req() req: Request) {
    req.session.cookie.cs = 'cs';
    console.log(req.session);
    return 'ok';
  }

  @Get('getmany')
  async getmany(@Query('id') id: number) {
    const res = {
      one: await this.user.getone(id),
      many: await this.user.getmany(id),
    };
    return res;
  }

  @Get('addbook')
  async addbook(@Body() data: any) {
    return await this.user.addbook(data);
  }

  @Get('data')
  async setdata() {
    const res = await this.userdataService.findAllusername();
    return {
      data: res,
    };
  }

  @Get('csauth')
  @Auth()
  async getcs() {
    return 'csauth';
  }

  @Role(['user', 'admin'])
  @Get('csrole')
  async getcsrole() {
    return 'csrole';
  }

  @Post('csupload')
  @UseInterceptors(FileInterceptor('file'))
  async csupload(@UploadedFile() file: Express.Multer.File) {
    return this.fileservice.uploadone(file);
  }

  @Post('uploadmany')
  @UseInterceptors(FilesInterceptor('files'))
  async getuploadmany(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    const filesname = [];
    files.forEach((e) => {
      filesname.push(e.originalname);
    });
    return filesname;
  }

  @Post('uploadabc')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file1', maxCount: 1 },
      { name: 'file2', maxCount: 1 },
    ]),
  )
  async getabvup(
    @UploadedFiles()
    files: {
      avatar?: Express.Multer.File[];
      background: Express.Multer.File[];
    },
  ) {
    console.log(files);
  }

  @Post('uploadall')
  @UseInterceptors(AnyFilesInterceptor())
  async getallupload(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }

  @Get('looksessiondata')
  async cssessiondata(@Req() req: Request) {
    console.log(req.session);
    return req.session.token ? 'session未过期' : 'session过期';
  }
}
