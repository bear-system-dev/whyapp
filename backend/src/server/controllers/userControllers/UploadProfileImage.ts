import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const uploadProfileImage = (req: Request, res: Response): Response => {
  console.log(req.file);

  const size = String((Number(req.file?.size) / 1024 / 1024).toFixed(2)) + 'MB'; //MB
  return res.status(StatusCodes.CREATED).json({
    field: req.file?.fieldname,
    name: req.file?.originalname,
    key: req.file?.filename,
    path_url: `/uploads/userProfileImages/${req.file?.filename}`,
    size: size,
  });
};