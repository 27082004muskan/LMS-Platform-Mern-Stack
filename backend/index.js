import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import authRouter from './route/authRoute.js';
import cors from 'cors';
import userRouter from './route/userRoute.js';
import courseRouter from './route/courseRoute.js';

dotenv.config();    //to read .env file

const port = process.env.PORT || 8000;  //|| 8000

const app = express();

app.use(express.json())  //middleware to parse json data
app.use(cookieParser())   //middleware to parse cookies
app.use(cors({
    origin: ['http://localhost:5173', 'https://your-frontend-domain.vercel.app'], 
    credentials: true
})) //middleware to allow cross-origin requests

app.use("/api/auth", authRouter);  // calling auth router from route folder whose controller is defined in controller folder
app.use("/api/user", userRouter); 
app.use("/api/course", courseRouter);  // 

app.get('/', (req, res) => {
    res.send('Hello World!');
})

// Connect to database immediately
connectDb();

// Export the app as default export for Vercel serverless deployment
export default app;

// Only start server in development (not in production/Vercel)
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log("server started");
    });
}
