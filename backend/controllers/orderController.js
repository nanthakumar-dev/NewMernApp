const catchAsyncErr=require('../middleware/catchAsyncErr')
const orderModel=require('../model/orderModel')
const productModel=require('../model/productModel')
const ErrorHandler=require('../middleware/errorHandler')

exports.getAllOrder=catchAsyncErr(async (req,res,next)=>{
    const order =await orderModel.find()
    const totalAmount=order.reduce((acc,items)=>{
        return items.totalPrice+acc
    },0)
    res.status(200).json({
        success:true,
        message:"Get All Order Successfully",
       totalAmount,
        order
    })
})
exports.newOrder=catchAsyncErr(async (req,res,next)=>{
    const {shippingPrice,taxPrice}=req.body

    req.body.user=req.user.id
    req.body.itemsPrice=req.body.orderItems.reduce((acc,item)=>{return acc+(item.price*item.quantity)},0)
    console.log("ItemsPrice : ",req.body.itemsPrice)
    req.body.totalPrice=shippingPrice+taxPrice+req.body.itemsPrice
     order =await orderModel.create(req.body)
    res.status(201).json({
        success:true,
        message:"Order Created Successfully",
        order
    })
    res.status(201).json({
        success:true,
        message:"Order Created Successfully",
        order
    })
})
exports.getSingleOrder=catchAsyncErr(async (req,res,next)=>{
    let order=await orderModel.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler("Order Not Found",404))
    }
    
    res.status(200).json({
        success:true,
        message:"Get Single Order Successfully",
        order
    })
    
})
exports.updateOrder=catchAsyncErr(async (req,res,next)=>{
    const {orderStatus}=req.body
    let order=await orderModel.findById(req.params.id)
    if(order.orderStatus=="Delivered"){
        return next(new ErrorHandler("Order Has Delivered ",404))
    }
    order.orderItems.forEach(item=>{
        stockUpdate(item.product,item.quantity)
    })
    order.orderStatus=orderStatus
    await order.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
        message:"Order Updated Successfully",
        order
    })

})
async function stockUpdate(productId,quantity){
    console.log("Stack Function")
    const product=await productModel.findById(productId)
    product.stock-=quantity
    await product.save({validateBeforeSave:false})
}

exports.deleteOrder=catchAsyncErr(async (req,res,next)=>{
    let order=await orderModel.findById(req.params.id)
    if(!order){
        return next(new ErrorHandler("Order Not Found",404))
    }
    order=await orderModel.findByIdAndDelete(req.params.id)
    res.status(200).json({
        success:true,
        message:"Order Deleted Successfully",
        order
    })
    
    
})
exports.myOrder=catchAsyncErr(async (req,res,next)=>{
    const order=await orderModel.find({user:req.user.id})
    if(!order){
        return next(new ErrorHandler("You Don't Have a Order",404))
    }
    res.status(200).json({
        success:true,
        message:"My Order",
        order
    })
})