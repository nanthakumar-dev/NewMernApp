const sendToken=(user,statusCode,res,message)=>{
    const token= user.getJwtToken()
    const options={expires:new Date(Date.now()+process.env.COOKIE_EXPIRES*24*60*60*1000),httpOnly:true}

    res.status(statusCode).
    cookie('token',token,options)
    .json({
        success:true,
        message,
        token,
        user
    })
}
module.exports=sendToken