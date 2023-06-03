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

projectRoute.get("/projects",async(req,res)=>{
    try {
        const projects = await Project.find();
        if (!projects) {
          res.send({ msg: 'project not found' });
        } else {
          res.send(projects);
        }
      } catch (err) {
        res.send({msg:"Error in finding projects"});
      }
})
projectRoute.put("/projects/:id",async(req,res)=>{
    const id=req.params.id;
  try {
    const project = await Project.findById(id);
    if (!project) {
      res.send({ msg: 'project not found' });
    } else {
        const {status}=req.body
       project.status= status
      await project.save();
      res.send({ msg: 'project updated successfully', project: project });
    }
  } catch (err) {
    res.send({msg:"Error in updating users data,try again"});
  }
})
module.exports={projectRoute};