import { ApiProperty } from '@nestjs/swagger';
import { drive_v3 } from 'googleapis';
import Schema$File = drive_v3.Schema$File;

export class GoogleDrivePermission {
  @ApiProperty()
  type: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  emailAddress: string;
}

export class CreateGoogleDrivePermissionByEmail {
  @ApiProperty()
  emails: string[];
}

export class CreatePermissionDto {
  @ApiProperty()
  resource: GoogleDrivePermission;

  @ApiProperty()
  fileId: string;

  @ApiProperty()
  fields: string;
}

export class ParamsUploadGoogleDrive {
  @ApiProperty()
  data: Buffer;

  @ApiProperty()
  fileName: string;

  @ApiProperty()
  folderName: string;

  @ApiProperty()
  mimetype: string;
}

export class ParamsShareGoogleDrive {
  @ApiProperty()
  fileId: string;

  @ApiProperty()
  emails?: string[];
}

export class CreateNewFileDto {
  @ApiProperty()
  data: Buffer | any;

  @ApiProperty()
  folder: Schema$File;

  @ApiProperty()
  fileName: string;

  @ApiProperty()
  mimetype: string;
}

export class ResponseUploadGoogleDrive {
  @ApiProperty()
  data: {
    kind: string;
    id: string;
    name: string;
    mimeType: string;
  };

  @ApiProperty()
  folder: {
    id: string;
    name: string;
  };

  @ApiProperty()
  shared?: string[];
}

export class ParamsResourceFilesCreate {
  // * Deprecated. Creating files in multiple folders is no longer supported.
  enforceSingleParent?: boolean;

  // * Whether to ignore the domain's default visibility settings for the created file. Domain administrators can choose to make all uploaded files visible to the domain by default; this parameter bypasses that behavior for the request. Permissions are still inherited from parent folders.
  ignoreDefaultVisibility?: boolean;

  // * A comma-separated list of IDs of labels to include in the labelInfo part of the response.
  includeLabels?: string;

  // * Specifies which additional view's permissions to include in the response. Only 'published' is supported.
  includePermissionsForView?: string;

  // * Whether to set the 'keepForever' field in the new head revision. This is only applicable to files with binary content in Google Drive. Only 200 revisions for the file can be kept forever. If the limit is reached, try deleting pinned revisions.
  keepRevisionForever?: boolean;

  // * A language hint for OCR processing during image import (ISO 639-1 code).
  ocrLanguage?: string;

  // * Whether the requesting application supports both My Drives and shared drives.
  supportsAllDrives?: boolean;

  // * Deprecated use supportsAllDrives instead.
  supportsTeamDrives?: boolean;

  // * Whether to use the uploaded content as indexable text.
  useContentAsIndexableText?: boolean;

  // * Request body metadata
  requestBody?: Schema$File;

  // * Media metadata
  media?: {
    // * Media mime-type
    mimeType?: string;
    // * Media body contents
    body?: any;
  };
}
