const express=require("express")
const cors=require("cors")
const { connection } = require("./Configs/db")
const { userRoute } = require("./Routes/user.route")
const cookieParcer=require("cookie-parser")
const { dashRoute } = require("./Routes/dashboard.route")
const { auth } = require("./Middleware/auth")
require("dotenv").config()

const app=express()

app.use(express.json())
app.use(cookieParcer())
app.use(cors())

app.use('/',userRoute)
app.use('/',dashRoute)

const port=process.env.port || 3001

app.listen(port,async()=>{
    try {
        await connection
        console.log("Connected to DB")
        console.log(`port ${port}`)
    } catch (error) {
        console.log(`unable to connect to DB ${error.message}`)
    }
})