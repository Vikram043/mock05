const express=require("express")
const { EmployeModel } = require("../Modules/employee.module")
const dashRoute=express.Router()

dashRoute.post("/employees",async(req,res)=>{
    const payload=req.body

    try {
        newEmployee=new EmployeModel({...req.body})
        await newEmployee.save()
        res.status(200).send({message:"New Employee added"})
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})


dashRoute.post("/employees",async(req,res)=>{
    const payload=req.body

    try {
        newEmployee=new EmployeModel({...req.body})
        await newEmployee.save()
        res.status(200).send({message:"New Employee added"})
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

dashRoute.get("/employees",async(req,res)=>{

    try {
        Employee=await EmployeModel.find()
        res.status(200).send(Employee)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

dashRoute.patch("/employees/:id",async(req,res)=>{
    const payload=req.body
    const id=req.params.id
    try {
        await EmployeModel.findByIdAndUpdate({id:_id},payload)
        res.status(200).send({message:"Employee Updated"})
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

dashRoute.delete("/employees/:id",async(req,res)=>{
    const id=req.params.id
    try {
        await EmployeModel.findByIdAndDelete(id)
        res.status(200).send({message:"Employee Deleted"})
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

dashRoute.get("/employees/:id",async(req,res)=>{
    const id=req.params.id
    try {
        await EmployeModel.findByIdAndDelete(id)
        res.status(200).send({message:"Employee Deleted"})
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

dashRoute.get("/dept/:department",async(req,res)=>{
    const {department}=req.params

    try {
        const Employee=await EmployeModel.find({department})
        res.status(200).send(Employee)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})


dashRoute.get("/search/:firstName",async(req,res)=>{
    const {firstName}=req.params
    try {
        const Employee=await EmployeModel.find({firstName}).limit(4)
        res.status(200).send(Employee)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})



dashRoute.get("/sort/:order",async(req,res)=>{
    const order=req.params.order ==='asc'?1:-1;
    try {
        const Employee=await EmployeModel.find().sort({salary:order}).limit(4)
        res.status(200).send(Employee)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})



dashRoute.get("/page/:page",async(req,res)=>{
    const {page}=req.params
    try {
        const Employee=await EmployeModel.find().skip((page-1)*4).limit(4)
        res.status(200).send(Employee)
    } catch (error) {
        res.status(400).send({message:error.message})
    }
})
module.exports={dashRoute}