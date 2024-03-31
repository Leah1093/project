import express, { query } from "express";
import 'dotenv/config';
import { userRouter } from './router/usersRouter.js'
import {logErrors} from './middleware/logError.js'


const app = express();
app.use(express.json());
app.use('/user', userRouter);
app.use(logErrors);

app.listen(8082, () => {
    console.log("start server port: 8080");
})


