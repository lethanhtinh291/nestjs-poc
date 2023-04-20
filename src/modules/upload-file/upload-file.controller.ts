import {
  Controller,
  Post,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { GoogleDriveService } from '../../shares/services/google/google-drive/google-drive.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { ResponseUploadGoogleDrive } from '../../shares/dtos/google-drive.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../../cores/filters/http-exception.filter';

@Controller('upload-file')
@UseFilters(HttpExceptionFilter)
export class UploadFileController {
  private readonly googleDriveReportFolder: string;
  private readonly googleDriveReportShareUsers: string[];

  constructor(
    private readonly configService: ConfigService,
    private readonly fileUploadService: GoogleDriveService,
  ) {
    this.googleDriveReportFolder = this.configService.get<string>(
      'google.drive.folderUploadReport',
    );

    this.googleDriveReportShareUsers = this.configService.get<string[]>(
      'google.drive.share.users',
    );
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'file' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResponseUploadGoogleDrive> {
    const { buffer, originalname, mimetype } = file;

    const response: ResponseUploadGoogleDrive =
      await this.fileUploadService.uploadFile({
        data: buffer,
        fileName: `${originalname}_${new Date().getTime()}`,
        folderName: this.googleDriveReportFolder,
        mimetype: mimetype,
      });

    const shared: string[] = await this.fileUploadService.shareFile({
      emails: this.googleDriveReportShareUsers,
      fileId: response.folder.id,
    });

    return { data: response.data, folder: response.folder, shared };
  }
}
