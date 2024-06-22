import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import postsRoutes from './routes/posts.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'


const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended : "true"}));
app.use(bodyParser.urlencoded({limit: "30mb", extended : "true"}));
app.use(cors());

app.use('/api/posts', postsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL)
        .then(() =>app.listen(PORT, () => console.log(`Server is Running on Port : ${PORT}`)))
        .catch((error) => console.log(error));

