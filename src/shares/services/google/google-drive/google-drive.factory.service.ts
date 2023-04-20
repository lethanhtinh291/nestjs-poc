import {
  CreateGoogleDrivePermissionByEmail,
  CreateNewFileDto,
  GoogleDrivePermission,
  ParamsResourceFilesCreate,
} from '../../../dtos/google-drive.dto';
import { GOOGLE } from '../../../../configs/app.constant';
import * as stream from 'stream';
import slugify from 'slugify';

export class GoogleDriveFactoryService {
  createPermission(
    data: CreateGoogleDrivePermissionByEmail,
  ): GoogleDrivePermission[] {
    return data.emails.map((email) => {
      return {
        type: GOOGLE.PERMISSION.TYPE.USER,
        role: GOOGLE.PERMISSION.ROLE.WRITER,
        emailAddress: email,
      };
    });
  }

  createFolder(folderName: string) {
    return {
      requestBody: {
        mimeType: GOOGLE.DRIVE.MIMETYPE.FOLDER,
        name: folderName,
        shared: true,
      },
      fields: 'id, name',
    };
  }

  createFile(params: CreateNewFileDto): ParamsResourceFilesCreate {
    return {
      requestBody: {
        name: slugify(params?.fileName.toLowerCase()),
        parents: params?.folder?.id ? [params?.folder.id] : [],
        mimeType: params?.mimetype,
      },
      media: {
        mimeType: params?.mimetype,
        body: new stream.PassThrough().end(params.data),
      },
    };
  }
}
