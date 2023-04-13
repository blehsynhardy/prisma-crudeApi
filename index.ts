import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv'
import cors from 'cors';
import path from 'path'
import { protect } from './auth/auth';
import user from './routes/user';
import product from './routes/product';
import update from './routes/update';
import { notFound } from './middleware/not-found'; 


const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 7000;
app.use('/api/user', user);
app.use('/api/product',protect, product)
app.use('/api/update', protect, update);
app.use(notFound)

app.listen(PORT, ()=> console.log(`app running on ${PORT}`));
app.get('/', (req, res) => {
    res.send('hello world');
});

//use render.com create db;