import express, { query } from "express";
import cors from 'cors';
import 'dotenv/config';
import { userRouter } from './router/usersRouter.js'
import { albumRouter } from './router/albumsRouter.js'
import { photoRouter } from './router/photosRouter.js'
import { postRouter } from './router/postsRouter.js'
import { commentRouter } from './router/commentsRouter.js'
import { todoRouter } from './router/todosRouter.js'
import { entranceRouter } from './router/entranceRouter.js'
import { logErrors } from './middleware/logError.js'
import { authMiddleware } from './middleware/authMiddleware.js'

const app = express();
app.use(express.json());
app.use(cors());
app.use('/entrance', entranceRouter);
app.use(authMiddleware);
app.use('/user', userRouter);
app.use('/album', albumRouter);
app.use('/photo', photoRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/todo', todoRouter);
app.use(logErrors);
app.listen(process.env.PORT, () => {
    console.log(`start server port: ${process.env.PORT}`);
})


