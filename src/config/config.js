import dotenv from 'dotenv';

dotenv.config();

export default {
    mongoUrl: process.env.MONGO_URL,
    port: process.env.PORT,
    lakey: process.env.LAKEY,
    entorno: process.env.ENTORNO
}