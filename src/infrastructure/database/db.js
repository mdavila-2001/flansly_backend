import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const cleanEnv = (val) => val ? val.replaceAll('\'', '').trim() : '';

export const sequelize = new Sequelize(
    cleanEnv(process.env.PGDATABASE),
    cleanEnv(process.env.PGUSER),
    cleanEnv(process.env.PGPASSWORD),
    {
        host: cleanEnv(process.env.PGHOST),
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: process.env.PGSSLMODE === 'require',
                rejectUnauthorized: false 
            }
        },
        logging: false,
        define: {
            timestamps: true,
            underscored: true
        }
    }
);
export const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a NeonDB establecida con éxito.');
        await sequelize.sync();
        console.log('Modelos de la base de datos sincronizados con éxito.');
    } catch (error) {
        console.error('Error conectando a la base de datos:', error);
    }
};