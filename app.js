import express, { query } from "express";
import 'dotenv/config';
 import { userRouter } from './router/usersRouter.js'
const app = express();


 app.use('/user',userRouter)


app.listen(8081, () => {
    console.log("start server port: 8080");
})


