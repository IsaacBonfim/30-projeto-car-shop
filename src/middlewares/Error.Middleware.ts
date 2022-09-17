import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import CodeError from '../errors/CodeErrors';

const errorHandler = async (
  err: CodeError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { code, message } = err;

  console.log(err);
  
  if (err instanceof ZodError) {
    return res.status(400)
      .json({ message: err.issues[0].message });
  }

  res.status(code || 500).json({ message });
};

export default errorHandler;
