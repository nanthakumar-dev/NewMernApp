const ErrorHandler=require("./errorHandler")
const jwt=require('jsonwebtoken')
const userModel=require('../model/userModel')

exports.isAuthenticated=async(req,res,next)=>{
    const{token}= req.cookies
 
    if(!token){
        return next(new ErrorHandler("First Login to Solve This Error",401))
    }
    const decoded=jwt.verify(token,process.env.SECRET_KEY)
    const id=decoded.id

    req.user=await userModel.findById(id)
    next()  
}
exports.isAuthericedUser=(...role)=>(req,res,next)=>{
 
    if(!role.includes(req.user.role)){
        return next(new ErrorHandler(`The Role ${req.user.role} Is Not Allowed`,401))
    }

    next()
}