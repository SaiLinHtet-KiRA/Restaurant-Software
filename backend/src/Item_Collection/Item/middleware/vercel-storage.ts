import { NextFunction, Response, Request } from "express";
import { put } from "@vercel/blob";

const SaveImage = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (req.file) {
      const file = req.file as Express.Multer.File;
      const path = `game/photo/${new Date().getTime()}`;
      const blob = await put(path, file.buffer, {
        access: "public",
        addRandomSuffix: true,
        contentType: file.mimetype,
      });
      req.body.photo_url = blob.url;
      req.body.photo = undefined;
    }
    next();
  } catch (error) {
    next(error);
  }
};
export default SaveImage;
