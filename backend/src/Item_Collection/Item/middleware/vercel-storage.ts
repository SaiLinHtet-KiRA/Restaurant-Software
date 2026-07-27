import { NextFunction, Response, Request } from "express";
import { put } from "@vercel/blob";

const SaveImage = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    if (files?.icon?.[0]) {
      const path = `game/icon/${new Date().getTime()}`;
      const blob = await put(path, files.icon[0].buffer, {
        access: "public",
        addRandomSuffix: true,
        contentType: files.icon[0].mimetype,
      });
      req.body.icon = blob.url;
    }

    if (files?.background?.[0]) {
      const path = `game/background/${new Date().getTime()}`;
      const blob = await put(path, files.background[0].buffer, {
        access: "public",
        addRandomSuffix: true,
        contentType: files.background[0].mimetype,
      });
      req.body.background = blob.url;
    }

    next();
  } catch (error) {
    next(error);
  }
};
export default SaveImage;
