import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { AuthorizeError, NotFoundError, ValidationError } from "./errors";

export const HandleErrorWithLogger = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let reportError = true;
  let status = 500;
  let message = error.message;

  [NotFoundError, ValidationError, AuthorizeError].forEach((typeOfError) => {
    if (error instanceof typeOfError) {
      reportError = false;
      status = error.status;
      message = error.message;
    }
  });

  if (error instanceof mongoose.Error.ValidationError) {
    reportError = false;
    status = 400;
    message = error.message;
  }

  if (reportError) {
    console.log(error);
  } else {
    console.log(error);
  }

  if (!res.headersSent) {
    res.status(status).json({ message, data: null });
  }
};

export const HandleUnCaughtException = async (error: Error) => {
  console.log(error);
  process.exit(1);
};
