const path=require('path')
const dotenv=require('dotenv');
dotenv.config({path:path.join(__dirname,"config/config.env")})
const express=require('express')
const app=express()
const productRoute=require('./routes/productRoute')

const userRoute=require('./routes/userRoute')
const orderRoute=require('./routes/orderRoute')
const paymentRoute=require('./routes/paymentRoute')

const errorMiddleware=require('./middleware/error')
const cookieParser=require('cookie-parser')
const cors=require('cors')
app.use(cookieParser())

app.use(express.json())
app.use(cors())
app.use('/api/v1',productRoute)

app.use('/uploads',express.static(path.join(__dirname,'./uploads/user')))
app.use('/uploads/product',express.static(path.join(__dirname,'./uploads/product')))
app.use('/api/v1',userRoute)
app.use('/api/v1',orderRoute)
app.use('/api/v1',paymentRoute)


    app.use(express.static(path.join(__dirname,'./dist')))
    app.get('/',(req,res)=>{
        res.sendFile(path.join(__dirname,'./dist/index.html'))
    }
    )

app.use(errorMiddleware)




module.exports=app
