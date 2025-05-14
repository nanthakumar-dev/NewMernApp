const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt') 
const jwt=require('jsonwebtoken') 
const crypto=require('crypto') 

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"]
    },
    lastName:String,
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter Valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[10,"Password Can't Exceed 10 Character"],
        select:false
    },
    avatar:{
        type:String
    },
    role:{
        type:String,
        default:"user"
    },
    dob:{
        type:String
    },
    bio:{
        type:String
    },
    gender:{
        type:String
    },
    resetPasswordToken:{
        type:String
    },
    resetPasswordTokenExpires:{
        type:Date
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    }
    
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.getJwtToken=function(){
    
    
    return  jwt.sign({id:this.id},process.env.SECRET_KEY,{expiresIn:process.env.JWT_TOKEN_EXPIRES_TIME})
}


userSchema.methods.isValidPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
userSchema.methods.resetToken=async function(){
    const token=crypto.randomBytes(20).toString('hex')

    this.resetPasswordToken=crypto.createHash('sha256').update(token).digest('hex')
    
    this.resetPasswordTokenExpires=Date.now()+30*60*1000

    return token
}

const userModel= mongoose.model('user',userSchema)

module.exports=userModel