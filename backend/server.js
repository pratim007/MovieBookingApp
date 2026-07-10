import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRouter.js';
import movieRouter from './routes/movieRouter.js';
import path from 'path';
import bookingRouter from './routes/bookingRouter.js';

const app = express();
const port = 5000;

//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//DB
connectDB();

//ROUTES
const uploadDir = process.env.VERCEL ? "/tmp" : path.join(process.cwd(), "uploads");
app.use('/uploads', express.static(uploadDir));
app.use('/api/auth', userRouter);
app.use('/api/movies', movieRouter);
app.use('/api/bookings', bookingRouter);

app.get('/', (req,res) => {
    res.json({ message: 'Movie Booking backend is running' });
});

app.listen(port, () => {
    console.log(`server started on ${port}`);
});
