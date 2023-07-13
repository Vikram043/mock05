const jwt=require("jsonwebtoken")

require('dotenv').config()

const auth=async(req,res,next)=>{
    const {AccessToken}=req.cookies

    try {
        if(!AccessToken) return res.status(400).send({message:"Please login again"})

        const decode=jwt.verify(AccessToken,process.env.key)
        if(!decode) return res.status(400).send({message:"JWT expired"})

        req.userId=decode.userId

        next()
    } catch (error) {
        res.status(400).send({message:error.message})
    }
}
module.exports={auth}