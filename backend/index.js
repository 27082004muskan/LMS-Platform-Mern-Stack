import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import authRouter from './route/authRoute.js';
import cors from 'cors';
import userRouter from './route/userRoute.js';
import courseRouter from './route/courseRoute.js';

dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json())
app.use(cookieParser())

// REPLACE THIS ENTIRE SECTION ⬇️
// OLD CODE TO REMOVE:
// app.use(cors({
//     origin: ['http://localhost:5173', 'https://your-frontend-domain.vercel.app'], 
//     credentials: true
// }))

// NEW CODE TO ADD:
const allowedOrigins = [
    process.env.FRONTEND_URL_LOCAL,
    process.env.FRONTEND_URL_VITE,
    process.env.FRONTEND_URL_PROD
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
// REPLACE SECTION ENDS HERE ⬆️

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter); 
app.use("/api/course", courseRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
})

connectDb();

export default app;

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
}
