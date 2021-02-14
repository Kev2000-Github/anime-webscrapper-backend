import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

export const corsOptions = {
    origin:
        process.env.NODE_ENV === 'production'
            ? [/localhost/]
            : [/localhost/],
    credentials: true,
    allowedHeaders: 'Content-Type, user-id, X-Requested-With, Accept',
    methods: 'GET',
    exposedHeaders: 'user-id'
};
