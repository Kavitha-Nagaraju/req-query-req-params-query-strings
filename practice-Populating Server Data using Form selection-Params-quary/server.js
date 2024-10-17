const mongoose = require("mongoose");
const express = require("express");
const cors  = require("cors");

let app = express();
app.use(cors());

app.get("/countriesList", async(req,res)=>{
    let countreisListArr = await Employee.find().distinct("country");
    return res.json(countreisListArr);
}) 

app.get("/departmentsList", async(req,res)=>{
    let departmentsListArr = await Employee.find().distinct("department");
    return res.json(departmentsListArr);
}) 

app.get("/gendersList", async(req,res)=>{
    let gendersListArr = await Employee.find().distinct("gender");
    return res.json(gendersListArr);
}) 

app.get("/salaryList", async(req,res)=>{
  let salaryListArr = await Employee.find().distinct("salary");
  return res.json(salaryListArr);
}) 

app.get("/ageList", async(req,res)=>{
  let ageListArr = await Employee.find().distinct("age");
  return res.json(ageListArr);
}) 

app.get("/employees",async(req,res)=>{
  console.log(req.query);
   let employeeArr = await Employee.find().and([{country:req.query.country},{department:req.query.department},{gender:req.query.gender},{salary:req.query.salary},{age:req.query.age}]);
   res.json(employeeArr);
});

app.get("/employees/:country/:department/:gender/:salary/:age",async(req,res)=>{
  console.log(req.params);
   let employeeArr = await Employee.find().and([{country:req.params.country},{department:req.params.department},{gender:req.params.gender},{salary:req.params.salary},{age:req.params.age}]).limit(req.query.limit).sort(req.query.order=="asc"?"id":"-id");
   res.json(employeeArr);
});


app.listen(4567,()=>{
  console.log("Listen to the port number 4567");
});


let employeeSchema = new mongoose.Schema({
    Id:String,
    firstName:String,
    lastName:String,
    email:String,
    gender:String,
    age:Number,
    department:String,
    profilePic:String,
    salary:Number,
    country:String,
});

let Employee = new mongoose.model("employee",employeeSchema,"employees");

let connectToMDB =async()=>{


   try {
    mongoose.connect("mongodb+srv://nagarajukavibhavi:nagarajukavibhavi@cluster0.okjzs.mongodb.net/tata?retryWrites=true&w=majority&appName=Cluster0");
    console.log("Connect to MDB");
    let employeesArr = await Employee.find();
    console.log(employeesArr)
    
   } catch (error) {
     console.log("Unable to connect MDB");
     console.log(error);
   }

};

  
connectToMDB();

