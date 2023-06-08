const express=require("express")
const cors=require("cors")
require('dotenv').config()
const { usersRoute } = require("./routes/usersRoute")
const { connection } = require("./config/db")
const { projectRoute } = require("./routes/projectRoute")
let port=process.env.port
const app=express()
app.use(express.json())
app.use(cors({origin:"*"}))
app.use("/",usersRoute);
app.use("/",projectRoute);

app.get("/",(req,res)=>{
    try{
        res.send("Home")
    }catch(err){
        res.send(err)
    }
})


app.listen(port,async()=>{
    try{
        await connection;
        console.log("conected")
    }catch(err){
        console.log(err)
    }
console.log("running on port 8080")
})