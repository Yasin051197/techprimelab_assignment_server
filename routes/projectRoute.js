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
  let skipRecords=(Number(page))*10;
    try {
        const projects = await Project.find().limit(limit).skip(skipRecords-10)
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
//Total count
    let count=await Project.find().count()

  //counts of closed, running, registor, cancelled
  let data=await Project.aggregate([{$group:{_id:"$status",count:{$sum:1}}},{$sort:{_id:1}}])

//ClouserCount 
  let clousercount=await Project.find({$and:[{status:"Running"},{end_date:{$lt:todayDate}}]}).count()

//for chart we get the total and closed count on behalf of their department
    let Closeddata=await Project.aggregate([{$match:{status:"Closed"}},{$group:{_id:"$department",closedCount:{$sum:1}}},{$sort:{_id:1}}])
    let Totaldata=await Project.aggregate([{$group:{_id:"$department",totalCount:{$sum:1}}},{$sort:{_id:1}}])

    res.send({Totaldata:Totaldata,Closeddata:Closeddata,clousercount:clousercount,data:data,count:count})
    
  }catch(err){
    res.send({msg:"Error in finding count of data,try again"})
  }
})

module.exports={projectRoute};