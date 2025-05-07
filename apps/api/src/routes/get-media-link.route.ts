import { upload } from "@src/middleware/multer";
import CloudinaryService from "@src/services/cloudinary-service";
import { Request, Response, Router } from "express";

const getMediaUrlRoute = Router();

getMediaUrlRoute.post(
  "/upload",
  upload.single("document"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      const url = await CloudinaryService.getFileUrl(req);

      if (!url) {
        res.status(400).json({ error: "Image upload failed" });
        return;
      }

      res.status(200).json({ url });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default getMediaUrlRoute;
