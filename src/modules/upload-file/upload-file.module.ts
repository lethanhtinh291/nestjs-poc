import { Module } from '@nestjs/common';
import { UploadFileController } from './upload-file.controller';
import { GoogleDriveService } from '../../shares/services/google/google-drive/google-drive.service';
import { ConfigModule } from '@nestjs/config';
import { GoogleDriveFactoryService } from '../../shares/services/google/google-drive/google-drive.factory.service';

@Module({
  imports: [ConfigModule],
  controllers: [UploadFileController],
  providers: [GoogleDriveService, GoogleDriveFactoryService],
})
export class UploadFileModule {}
