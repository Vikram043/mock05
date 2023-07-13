const express=require("express")
const userRoute=express.Router()
const jwt=require('jsonwebtoken')
const bcrypt=require("bcrypt")
const { UserModel } = require("../Modules/user.module")


userRoute.post('/signup',async(req,res)=>{
    const {email,password}=req.body

    const userExists=await UserModel.findOne({email})

    try {

        if(userExists) return res.status(400).send({message:"User Exists Please login"})

        const hash=bcrypt.hashSync(password,5)

        if(!hash)  return res.status(400).send({message:"Password formate is wrong"})

        const newUser=new UserModel({...req.body,password:hash})
        await newUser.save()
        return res.status(200).send({message:"User Registerd successfully"})

    } catch (error) {
        res.status(400).send({message:error.message})
    }
})

userRoute.post('/login',async(req,res)=>{
    const {email,password}=req.body

    const userExists= await UserModel.findOne({email})
        
    try {

        if(!userExists) return res.status(400).send({message:"User not found please register"})

        const decode=bcrypt.compareSync(password,userExists.password)

        if(!decode)  return res.status(400).send({message:"Invalid Credentials"})

       const AccessToken=jwt.sign({email,userId:userExists._id},process.env.key)

        res.cookie("AccessToken",AccessToken)
       //localStorage.setItem('token',AccessToken)

       res.status(200).send({message:"Login Successful"})

    } catch (error) {
        res.status(400).send({message:error.message})
    }
})


module.exports={userRoute}