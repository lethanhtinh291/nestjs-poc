import { Injectable } from '@nestjs/common';
import { drive_v3, google } from 'googleapis';
import {
  GoogleDrivePermission,
  ParamsShareGoogleDrive,
  ParamsUploadGoogleDrive,
  ResponseUploadGoogleDrive,
} from '../../../dtos/google-drive.dto';
import { GOOGLE } from '../../../../configs/app.constant';
import * as Promise from 'bluebird';
import { GoogleDriveFactoryService } from './google-drive.factory.service';
import { ConfigService } from '@nestjs/config';
import Drive = drive_v3.Drive;
import Schema$File = drive_v3.Schema$File;

@Injectable()
export class GoogleDriveService {
  private readonly auth: any;
  private readonly client: Drive;
  private readonly googleDriveAuthConfig: any;
  private readonly googleServiceAccountPath: string;

  constructor(
    private readonly googleDriveFactoryService: GoogleDriveFactoryService,
    private readonly configService: ConfigService,
  ) {
    this.googleDriveAuthConfig =
      this.configService.get<any>('google.drive.auth');

    this.googleServiceAccountPath = this.configService.get<string>(
      'google.serviceAccountPath',
    );

    this.auth = new google.auth.GoogleAuth({
      keyFilename: this.googleServiceAccountPath,
      scopes: this.googleDriveAuthConfig.scopes,
    });

    this.client = google.drive({ version: 'v3', auth: this.auth });
  }

  async createFolder(folderName: string): Promise<Schema$File> {
    return this.client.files.create(
      this.googleDriveFactoryService.createFolder(folderName),
    );
  }

  async shareFile({
    emails,
    fileId,
  }: ParamsShareGoogleDrive): Promise<string[]> {
    const permissionIds: string[] = [];

    const permissions: GoogleDrivePermission[] =
      this.googleDriveFactoryService.createPermission({ emails });

    await Promise.map(permissions, async (permission) => {
      const result = await this.client.permissions.create({
        requestBody: permission,
        fileId: fileId,
        fields: 'id',
      });
      permissionIds.push(result.data.id);
    });

    return permissionIds;
  }

  async searchFolder(folderName: string): Promise<Schema$File> {
    return new Promise((resolve, reject) => {
      this.client.files.list(
        {
          q: `mimeType='${GOOGLE.DRIVE.MIMETYPE.FOLDER}' and name='${folderName}'`,
          fields: 'files(id, name)',
        },
        (err: Error, res: { data: any }): void => {
          if (err) return reject(err);
          return resolve(res?.data?.files ? res.data.files.shift() : null);
        },
      );
    });
  }

  async isExistsFolder(folderName: string): Promise<[boolean, Schema$File]> {
    const data = await this.searchFolder(folderName);
    return [!!data, data];
  }

  async findOrCreateFolder(folderName: string): Promise<Schema$File> {
    const [isExistsFolder, folder] = await this.isExistsFolder(folderName);

    if (isExistsFolder) return folder;

    return this.createFolder(folderName);
  }

  async uploadFile(
    params: ParamsUploadGoogleDrive,
  ): Promise<ResponseUploadGoogleDrive> {
    const folder = await this.findOrCreateFolder(params.folderName);

    const { data: file } = await this.client.files.create(
      this.googleDriveFactoryService.createFile({
        fileName: params?.fileName,
        folder: folder,
        data: params.data,
        mimetype: params.mimetype,
      }),
    );

    return {
      data: file,
      folder: folder,
    };
  }
}
