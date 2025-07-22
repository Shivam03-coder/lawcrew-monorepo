import { appEnvConfigs } from "../configs";
import { v2 as cloudinary } from "cloudinary";
import { Request } from "express";
import { promises as fs } from "fs";
import path from "path";

cloudinary.config({
  cloud_name: appEnvConfigs.CLOUDINARY_CLOUD_NAME,
  api_key: appEnvConfigs.CLOUDINARY_API_KEY,
  api_secret: appEnvConfigs.CLOUDINARY_API_SECRET,
});

type FilePath = string | string[];

class CloudinaryService {
  private static getResourceType(filePath: string): "image" | "raw" {
    const extname = path.extname(filePath).toLowerCase();
    // Check if the file is an image (you can add more extensions if necessary)
    if ([".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff"].includes(extname)) {
      return "image";
    }
    // Otherwise, treat it as raw (PDF, video, etc.)
    return "raw";
  }

  private static async uploadSingleFile(
    filePath: string,
    attempt = 1
  ): Promise<string | null> {
    try {
      await fs.access(filePath);

      const resourceType = this.getResourceType(filePath);

      const uploadResponse = await cloudinary.uploader.upload(filePath, {
        resource_type: resourceType,
        timeout: 120000,
      });

      await fs
        .unlink(filePath)
        .catch((err) => console.warn("Failed to delete local file:", err));

      return uploadResponse.secure_url;
    } catch (error: any) {
      console.error(
        `Cloudinary upload failed for ${filePath} (Attempt ${attempt}):`,
        error.message || error
      );

      // Retry up to 3 times if timeout occurs
      if (attempt < 3 && error?.name === "TimeoutError") {
        console.warn(
          `Retrying upload for ${filePath} (Attempt ${attempt + 1})...`
        );
        return this.uploadSingleFile(filePath, attempt + 1);
      }

      // Delete file if upload fails
      await fs.unlink(filePath).catch(() => null);
      return null;
    }
  }

  private static async uploadFiles(
    filePaths: FilePath
  ): Promise<string | string[] | null> {
    if (!filePaths || (Array.isArray(filePaths) && filePaths.length === 0)) {
      console.error("No file path provided");
      return null;
    }

    const paths = Array.isArray(filePaths) ? filePaths : [filePaths];

    try {
      const uploadPromises = paths.map((filePath) =>
        this.uploadSingleFile(filePath)
      );
      const uploadedUrls = await Promise.all(uploadPromises);

      return uploadedUrls.length === 1
        ? uploadedUrls[0]
        : uploadedUrls.filter((url) => url !== null);
    } catch (error) {
      console.error("Error in CloudinaryService.uploadFiles:", error);
      return null;
    }
  }

  public static getFileUrl = async (req: Request): Promise<string | null> => {
    try {
      if (req.file?.path) {
        const uploadedFile = await CloudinaryService.uploadFiles(req.file.path);

        if (!uploadedFile) {
          throw new Error("File upload failed");
        }

        return uploadedFile as string;
      }

      return null;
    } catch (error: any) {
      throw new Error(
        error.message || "An error occurred while uploading the file"
      );
    }
  };
}

export default CloudinaryService;
