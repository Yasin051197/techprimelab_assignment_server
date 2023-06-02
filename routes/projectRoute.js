const express=require("express");
const { Project } = require("../modal/projectmodel");

const projectRoute=express.Router();


projectRoute.post("/createproject",async(req,res)=>{

    const {theme,reason,type,division,category,priority,department,start_date,end_date,location}=req.body; 

   try{
        const project=new Project({theme,reason,type,division,category,priority,department,start_date,end_date,location,status:"Registered"});
        await project.save();
        res.send({msg:"project registered successfully"});
    }
    catch(err){
        console.log(err);
    }
})

module.exports={projectRoute};