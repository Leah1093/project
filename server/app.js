import express, { query } from "express";
import 'dotenv/config';
import { userRouter } from './router/usersRouter.js'
import { postRouter } from './router/postsRouter.js'
import { commentRouter } from './router/commentsRouter.js'
import { todoRouter } from './router/todosRouter.js'
import {logErrors} from './middleware/logError.js'


const app = express();
app.use(express.json());
app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/todo', todoRouter);
app.use(logErrors);
app.listen(8086, () => {
    console.log("start server port: 8080");
})


