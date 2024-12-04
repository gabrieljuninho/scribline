import { v2 as cloudinary } from "cloudinary";

import { CloudinaryError as UploadServicesError } from "@/common/utils/cloudinary";

import {
  CreateFolderResponse,
  Folder,
  ResourcesResponse,
  RootFolderResponse,
} from "@/common/types/cloudinary";

export class Cloudinary {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME! as string,
      api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY! as string,
      api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET! as string,
    });
  }

  private async checkRateLimit(): Promise<ResourcesResponse> {
    return await cloudinary.api.resources();
  }

  private async existingRootFolder(folderName: string): Promise<boolean> {
    const rootFolders: RootFolderResponse = await cloudinary.api.root_folders();

    if (rootFolders.total_count === 0) {
      throw new UploadServicesError("No root folder found.");
    }

    const existingFolder = rootFolders.folders.find(
      (folder: Folder) => folder.name === folderName
    );

    if (existingFolder) {
      return true;
    }

    return false;
  }

  public async createRootFolder(
    folderName: string
  ): Promise<CreateFolderResponse> {
    const checkResourcesResponse: ResourcesResponse =
      await this.checkRateLimit();

    if (checkResourcesResponse.rate_limit_remaining === 0) {
      throw new UploadServicesError(
        "Rate limit has been exhausted, please try again later."
      );
    }

    const existingRootFolder: boolean =
      await this.existingRootFolder(folderName);

    if (existingRootFolder) {
      throw new UploadServicesError("Folder already exists.");
    }

    const folder: CreateFolderResponse =
      await cloudinary.api.create_folder(folderName);

    return folder;
  }
}
