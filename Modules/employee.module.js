const mongoose=require("mongoose")

const employeSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    department:{type:String,enum:["Tech","Marketing","Operations"]},
    salary:Number
})


const EmployeModel=mongoose.model("employe",employeSchema)

module.exports={EmployeModel}