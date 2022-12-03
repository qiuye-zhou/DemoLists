import { NestFactory } from '@nestjs/core';
//这样有提示
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './http-exception/http.exceotion.filter';
import { ResponseInterceptor } from './interceptor/response.interceptor';

export async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  //   cors: true,
  // });
  // 全局错误拦截
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局正常状态码返回
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  }); // 或者这样设置Cors
  // 这个设置的本来是dist里面的(dist/uploadcs)  但是在对应的接口里面进行跳出目录访问tmp里面的保存路径去了
  app.useStaticAssets(join(__dirname, 'uploadcs'), {
    //前面加虚拟路径
    prefix: '/updowcs',
  });
  // app.enableCors();
  // pipe管道
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: 422,
      forbidUnknownValues: true,
      stopAtFirstError: true,
    }),
  );
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 },
    }),
  );

  app.useStaticAssets(join(__dirname, '../../public'), {
    //前面加虚拟路径
    prefix: '/pub',
  });

  // hbs
  app.setBaseViewsDir(join(__dirname, '../../', 'views'));
  app.setViewEngine('hbs');

  // 配置 Swagger
  const options = new DocumentBuilder()
    .addBearerAuth() // 开启 BearerAuth 授权认证
    .setTitle('接口文档')
    .setDescription('demo接口文档')
    .setVersion('1.0')
    .addTag('test')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
