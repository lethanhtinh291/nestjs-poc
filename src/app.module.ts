import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UploadFileModule } from './modules/upload-file/upload-file.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './configs/app.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    UploadFileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
