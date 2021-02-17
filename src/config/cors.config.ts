import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

export const corsOptions = {
    origin:
        process.env.NODE_ENV === 'production'
            //@ts-ignore
            ? [/https:\/\/naughty-raman-a4b400.netlify.app\//]
            : [/localhost/],
    credentials: true,
    allowedHeaders: 'Content-Type, user-id, X-Requested-With, Accept',
    methods: 'GET',
    exposedHeaders: 'user-id'
};
