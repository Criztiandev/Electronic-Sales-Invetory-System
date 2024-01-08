import { Request, Response, NextFunction } from "express";
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if the status is 200 make it 500 else above
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // mongoose cast error
  if (err.name === "CastError") {
    statusCode = 404;
    message = "Resource Not Found";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENVI === "production" ? null : err.stack,
  });
};
