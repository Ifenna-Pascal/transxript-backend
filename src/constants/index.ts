import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
export const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING || '';
export const JWT_SECRET = process.env.JWT_SECRET || 'new';
