import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
}));

//middleware
app.use(express.json({limit: '16kb'}));  
app.use(express.urlencoded({extended: true, limit:"16kb"}))  

//routes
import userRouter from './routes/user.routes.js';

app.get('/', (req, res) => {
  res.send('Hello World!')
})  



//routes-declaration
app.use('/api/users', userRouter);

export { app }

