import express from "express";
import 'dotenv/config'
// import { productsRouter } from './router/productsRouter.js'
const app = express()


// app.use('/products',productsRouter)

app.listen(process.env.PORT, () => {
    console.log("start server port: 8080")
    
})