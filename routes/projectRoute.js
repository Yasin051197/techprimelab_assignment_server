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
   let page=req.query.page
   let limit=req.query.limit
  let s=(Number(page))*10;
    try {
        const projects = await Project.find().limit(limit).skip(s-10)
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
    const project = await Project.findById(id)
    if (!project) {
      res.send({ msg: 'project not found' });
    } else {
        const {status}=req.body
       project.status= status
      await project.save();
      res.send({ msg: 'project updated successfully', project: project });
    }
  } catch (err) {
    res.send({msg:"Error in updating projects data,try again"});
  }
})
projectRoute.get("/projectsCounts",async(req,res)=>{
  try{
    const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const todayDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    let count=await Project.find().count()
    let closedcount=await Project.find({status:"Closed"}).count()
    let runningcount=await Project.find({status:"Running"}).count()
    let cancledcount=await Project.find({status:"Cancelled"}).count()
    let clousercount=await Project.find({end_date:{$lt:todayDate}}).count()


    
    let strcount = await Project.find({department:"Statergy"}).count()
    let strclosedcount = await Project.find({$and:[{department:"Statergy"},{status:"Closed"}]}).count()
    let fincount = await Project.find({department:"Finance"}).count()
    let finclosedcount = await Project.find({$and:[{department:"Finance"},{status:"Closed"}]}).count()
    let qltcount = await Project.find({department:"Qaulity"}).count()
    let qltclosedcount = await Project.find({$and:[{department:"Qaulity"},{status:"Closed"}]}).count()
    let mancount = await Project.find({department:"Maintenance"}).count()
    let manclosedcount = await Project.find({$and:[{department:"Maintenance"},{status:"Closed"}]}).count()
    let stocount = await Project.find({department:"Stores"}).count()
    let stoclosedcount = await Project.find({$and:[{department:"Stores"},{status:"Closed"}]}).count()
    let hrcount = await Project.find({department:"HR"}).count()
    let hrclosedcount = await Project.find({$and:[{department:"HR"},{status:"Closed"}]}).count()
    res.send({count:count,closedcount:closedcount,runningcount:runningcount,cancledcount:cancledcount,
      clousercount:clousercount,strcount:strcount,strclosedcount:strclosedcount,fincount:fincount,finclosedcount:finclosedcount,
      qltcount:qltcount,qltclosedcount:qltclosedcount,mancount:mancount,manclosedcount:manclosedcount,stocount:stocount,
      stoclosedcount:stoclosedcount,hrcount:hrcount,hrclosedcount:hrclosedcount
    })
  }catch(err){
    res.send({msg:"Error in finding count of data,try again"})
  }
})

module.exports={projectRoute};