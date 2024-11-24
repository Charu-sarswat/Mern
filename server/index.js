<<<<<<< HEAD
import express from 'express'
=======
import express from 'express';
>>>>>>> d0ed4210aa8ac138eadfad88c28dccc90201bcef
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";

dotenv.config();

<<<<<<< HEAD

const app =express()

//using middlewares
app.use(express.json());

const port=5000;
=======
const app=express();

const port=process.env.PORT;


>>>>>>> d0ed4210aa8ac138eadfad88c28dccc90201bcef

app.get('/',(req,res)=>{
    res.send("Server is working");
});
<<<<<<< HEAD

//importing routes
import userRoutes from './routes/user.js'

//using routes
app.use('/api',userRoutes);
app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
    connectDb()
=======
app.listen(port, ()=>{
    console.log(`Server is running on http//localhost:${ port }`);
    connectDb();
>>>>>>> d0ed4210aa8ac138eadfad88c28dccc90201bcef
});