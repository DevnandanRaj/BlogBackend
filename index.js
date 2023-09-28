const express=require("express");
require("dotenv").config();
const cors=require("cors")
const {connection}= require("./connection/db");
const userRouter = require("./routes/userRoutes");
const blogRouter = require("./routes/blogRoutes");


const app=express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Welcome to Blog backend");
});

app.use("/api",userRouter)
app.use("/api",blogRouter)
app.listen(process.env.port, async()=>{
    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
})