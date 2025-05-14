const ErrorHandler=require("./errorHandler")
module.exports=(err,req,res,next)=>{
    if(process.env.NODE_ENV=='development'){
    err.statusCode=err.statusCode||505
    res.status(err.statusCode).json({
        success:false,
        message:err.message,
        stack:err.stack,
        error:err
    })
    }
    
    if(process.env.NODE_ENV=='production'){

    err.statusCode=err.statusCode||505
    let message=err.message
    let error=new ErrorHandler(message)
    if(err.name=="ValidationError"){
        message=Object.values(err.errors).map(val=>val.message)
        error=new ErrorHandler(message)

    }
    if(err.name=="CastError"){
        message="Resource Not Found"
        error=new Error(message)
        console.log("WORKING")

    }
    res.status(err.statusCode).json({
        success:false,
        message:message||"INTERNAL SERVER ERROR"
        
    })
}}