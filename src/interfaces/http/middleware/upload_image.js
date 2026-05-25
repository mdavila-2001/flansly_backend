import multer from 'multer';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';
import fs from 'node:fs';
import { ValidationError } from '../errors/validation.error.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOADS_FOLDER = path.join(__dirname, '../../../infrastructure/uploads');

if (!fs.existsSync(UPLOADS_FOLDER)) {
    fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let subfolder = 'post';
        if (file.fieldname === 'avatar') {
            subfolder = 'avatar';
        } else if (file.fieldname === 'banner') {
            subfolder = 'banner';
        } else if (file.fieldname === 'image') {
            subfolder = 'posts';
        }

        const dest = path.join(UPLOADS_FOLDER, subfolder);

        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }

        cb(null, dest);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const uniqueFilename = `flan_${crypto.randomUUID()}${ext}`;
        
        cb(null, uniqueFilename);
    }
});

const securityFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new ValidationError('Formato inválido. Solo se permiten ingredientes visuales (JPG, JPEG o PNG).'), false);
    }
};

export const uploadImage = multer({
    storage: storage,
    fileFilter: securityFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});