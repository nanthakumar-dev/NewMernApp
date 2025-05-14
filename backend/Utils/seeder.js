const express=require('express')
const dotenv=require('dotenv')
const database=require("../config/database")
const productModel=require("../model/productModel")
const productData=require("../data/productData.json")
dotenv.config({path:'config/config.env'})

database()

const seeder=async()=>{
    try{
        await productModel.deleteMany()
        console.log("Data Deleted Successfully")
        await productModel.insertMany(productData)
        console.log("Data Insert Successfully")
        process.exit()
    }
    catch(err){
        console.log(err)
    }
}
seeder()