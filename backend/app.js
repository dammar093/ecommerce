const express = require("express");
const userRouter = require("./src/routes/user");
const categoryRouter = require("./src/routes/category")
const productRouter = require("./src/routes/product")
const cors = require("cors")
const app = express();
const cookieParser = require("cookie-parser")
const path = require("path");

//middelwares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
// app.use(express.static(path.resolve(__dirname, 'public/dist')));

//routes
//user routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/categories",categoryRouter)
app.use("/api/v1/products",productRouter)
module.exports = app;