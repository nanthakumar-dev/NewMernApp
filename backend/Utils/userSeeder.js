const express=require('express')
const dotenv=require('dotenv')
const database=require("../config/database")
const userModel=require("../model/userModel")
dotenv.config({path:'config/config.env'})

database()

const userSeeder=async()=>{
    try{
        await userModel.deleteMany()
        console.log("User Data Deleted Successfully")
        
        process.exit()
    }
    catch(err){
        console.log(err)
    }
}
userSeeder()