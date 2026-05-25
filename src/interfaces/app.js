import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { testConnection } from '../infrastructure/database/db.js';
import { errorHandler } from './http/middleware/error_handler.js';
import apiRoutes from './http/routes/index.js';

dotenv.config();

const app = express();
app.disable('x-powered-by');
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../infrastructure/uploads')));

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'El horno de Flansly está encendido 🔥' });
});

app.use('/api', apiRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
    await testConnection();
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});