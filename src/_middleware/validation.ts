import joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../_exception';

export const validation = (schema: joi.Schema) => {
  const options: joi.AsyncValidationOptions = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
  };

  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      const errorMessage = error.details.map(field => field.message).join(', ');
      next(new HttpException(400, errorMessage));
    } else {
      req.body = value;
      next();
    }
  }
}