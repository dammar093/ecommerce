const express = require("express");
const userRouter = require("./src/routes/user");
const categoryRouter = require("./src/routes/category")
const cors = require("cors")
const app = express();
const cookieParser = require("cookie-parser")

//middelwares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())
//routes
//user routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/categories",categoryRouter)
module.exports = app;