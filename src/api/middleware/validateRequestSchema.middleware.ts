import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export default function validateRequestSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //Custom Error handling middleware
    return res.status(422).json({
      isRequestValid: false,
      error: errors.array(),
    });
  }
  next();
}
