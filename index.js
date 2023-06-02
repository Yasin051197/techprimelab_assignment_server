const express=require("express")
const cors=require("cors")
const { usersRoute } = require("./routes/usersRoute")
const { connection } = require("./config/db")
const { projectRoute } = require("./routes/projectRoute")
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


app.listen(8080,async()=>{
    try{
        await connection;
        console.log("conected")
    }catch(err){
        console.log(err)
    }
console.log("running on port 8080")
})