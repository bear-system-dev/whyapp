import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { serverMessages } from '../../shared/ServerMessages';

const notifyMessages = serverMessages.controllers.users.upload_profile_image;

export const uploadProfileImage = (req: Request, res: Response): Response => {
  const errors: Array<string> = [];
  const size = String((Number(req.file?.size) / 1024 / 1024).toFixed(2)) + 'MB'; //MB

  if (!req.file) errors.push(notifyMessages.noFile);

  if (errors.length >= 1) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors });
  return res.status(StatusCodes.CREATED).json({
    field: req.file?.fieldname,
    name: req.file?.originalname,
    key: req.file?.filename,
    path_url: `/uploads/userProfileImages/${req.file?.filename}`,
    size: size,
  });
};