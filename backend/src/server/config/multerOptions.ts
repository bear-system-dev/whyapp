import { Options, diskStorage } from 'multer';
import path from 'path';
import { randomBytes } from 'crypto';
import { serverMessages } from '../shared/ServerMessages';

const notifyMessages = serverMessages.config.multer;

const storagePath = path.resolve(__dirname, '..', '..', '..', 'uploads', 'userProfileImages');

const multerOptions = {
  dest: storagePath,
  storage: diskStorage({
    destination(req, file, callback) {
      callback(null, storagePath);
    },
    filename(req, file, callback) {
      randomBytes(15, (err, hash) => {
        if (err) callback(err, file.filename);
        const filename = `${hash.toString('hex')}-${file.originalname}.png`;
        callback(null, filename);
      });
    },
  }),
  limits: {
    fieldSize: 3 * 1024 * 1024 //3MB
  },
  fileFilter(req, file, callback) {
    const extensions = [
      'image/jpeg',
      'image/jpg',
      'image/png',
    ];
    if (extensions.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error(notifyMessages.incompatibleImageType));
    }
  },
} as Options;

export { multerOptions };