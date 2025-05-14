const catchAsyncErr=require('../middleware/catchAsyncErr')
const ErrorHandler=require('../middleware/errorHandler')
const userModel=require('../model/userModel')
const sendToken=require('../Utils/jwt')
const {sendEmail}=require('../Utils/sendEmail')
const crypto=require('crypto')


exports.register=catchAsyncErr(async (req,res,next)=>{
    
    const{name,email,password}=req.body
    let avatar;
    if(req.file){
        avatar=`${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }
    
    const user=await userModel.create({name,email,password,avatar})
    sendToken(user,201,res,'User Created Successfully')

    
})
exports.login=async (req,res,next)=>{
    const{email,password}=req.body
    
    if( !email || !password){
        return next(new ErrorHandler("Please Enter Email And Password"))
    }
    const user=await userModel.findOne({email}).select('+password')
    
    
    if(!user){
        return next(new ErrorHandler("User Not Found",404))
    }
    if(!await user.isValidPassword(password)){
        return next(new ErrorHandler("Please Enter Correct Password",401))
    }
    
    sendToken(user,200,res,"User Found Successfully")
    
    
    
}
exports.logout=catchAsyncErr(async (req,res,next)=>{
    res.status(200).
    cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    .json({
        success:true,
        message:"Logout Successfully"
    })
})
exports.forgotPassword=catchAsyncErr(async(req,res,next)=>{
    const {email}=req.body
    const user=await userModel.findOne({email})
    if(!user){
        return next(new ErrorHandler("User Not Found",404))
    }
    const resetToken=await user.resetToken()
    
    await user.save({validateBeforeSave:false})
    const resetUrl=await `${process.env.FRONTEND_URL}/password/reset/${resetToken}`
    message=`If You Forgot your password and you want to change this password,\n\n 
    click it\n
    ${resetUrl}
    `
    console.log("forgot token",resetToken)
    console.log("forgot reset token",crypto.createHash('sha256').update(resetToken).digest('hex'))
    
    try{
        await sendEmail({email,subject:'Recovery Email',message})
        res.status(200).json({
            success:true,
            message:`Email Send Successfully to ${email}`
        })
    }
    catch(err){
        console.log(err)
        this.resetPasswordToken=undefined;
        this.resetPasswordTokenExpires=undefined
        await user.save({validateBeforeSave:false})
        return next(new ErrorHandler(`Email Send Error${err}`,404))
    }
})
exports.resetPassword=catchAsyncErr(async(req,res,next)=>{
    console.log("token",req.params.token)
    const resetToken=await crypto.createHash('sha256').update(req.params.token).digest('hex')
    console.log("resetToken",resetToken)
    const {password,confirmPassword}=req.body
    console.log("TOKEN 2 :",resetToken)
    const user=await userModel.findOne({
        resetPasswordToken:resetToken,
        //resetPasswordToken:{$gt:Date.now()}
    })
    if(!user){
        return next(new ErrorHandler("User Not Found",404))
    }
    console.log(password,confirmPassword)
    if(password!=confirmPassword){
        return next(new ErrorHandler("Password Does't Match",404))
    }
    user.password=password;
    user.resetPasswordToken=undefined
    user.resetPasswordTokenExpires=undefined
    await user.save({validateBeforeSave:false})
    
    sendToken(user,200,res,"Password Reset Successfully")
})
exports.myProfile=catchAsyncErr(async (req,res,next)=>{

    const user=await userModel.findById(req.user.id)
    if(!user){
        return next(new ErrorHandler("user Not Found",404))
    }
    res.status(200).json({
        success:true,
        user
    })
})
exports.changePassword=catchAsyncErr(async (req,res,next)=>{
    const {oldPassword,password}=req.body
    const user=await userModel.findById(req.user.id).select('+password')
    if(!user){
        return next(new ErrorHandler("user Not Found",404))
    }
    if(!await user.isValidPassword(oldPassword)){
        return next(new ErrorHandler("User Password Incorrect",401))
    }
    console.log("good")
    user.password=password;
    await user.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
        message:"User Password Changed Successfully",
        user
    })
    
})
exports.updateProfile=catchAsyncErr(async (req,res,next)=>{
    const{name,role,bio,gender,dob,lastName}=req.body
    let avatar;
    if(req.file){
        avatar=`${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
    }
    let user=await userModel.findById(req.user.id)
    if(!user){
        return next(new ErrorHandler("user Not Found",404))
    }
    const userData={
        name,
        role,
        updatedAt:Date.now(),
        bio,
        dob,
        gender,
        avatar,
        lastName
    }
    user=await userModel.findByIdAndUpdate(req.user.id,userData,{new:true,runValidators:true})
    
    res.status(200).json({
        success:true,
        message:'Profile Updated Successfully',
        user
    })
})

exports.getAllUser=catchAsyncErr(async (req,res,next)=>{
    const user=await userModel.find();
    res.status(200).json({
        success:true,
        message:'Get All Users',
        user
    })
    
})
exports.getSingleUser=catchAsyncErr(async (req,res,next)=>{
    const user=await userModel.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler("user Not Found",404))
    }
    res.status(200).json({
        success:true,
        message:'Get Single Users',
        user
    })
    
})
exports.updateUser=catchAsyncErr(async (req,res,next)=>{
    const {name,email,role}=req.body
    let user=await userModel.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler("user Not Found",404))
    }
    user=await userModel.findByIdAndUpdate(req.params.id,{name,email,role},{new:true})

    res.status(200).json({
        success:true,
        message:'Update Users',
        user
    })
    
})
exports.deleteUser=catchAsyncErr(async (req,res,next)=>{
    let user=await userModel.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler("user Not Found",404))
    }
    user=await userModel.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success:true,
        message:'User Deleted Successfully',
        user
    })

})