const app=require('./app');
const createDatabase = require('./config/database');
const path=require('path')
const dotenv=require('dotenv');

createDatabase()
const server=app.listen(8000,()=>{
    console.log(`Server Started At ${process.env.PORT} in ${process.env.NODE_ENV} `)
})

process.on('unhandledRejection',(err)=>{
    console.log("ERROR : ",err.message)
    console.log("IT Take SHUTDOWN IN FEW MINUTES DOE TO UNHANDLED REJECTION")
    server.close(()=>{
        process.exit(1)
    })
})

process.on('uncaughtException',(err)=>{
    console.log("ERROR : ",err.message)
    console.log("IT TAKE SHUTDOWN IN FEW MINUTES DOE TO UNCAUGHT EXCEPTION")
    server.close(()=>{
        process.exit(1)
    })
})