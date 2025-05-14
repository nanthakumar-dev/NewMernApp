const productModel=require('../model/productModel')
const ErrorHandler=require('../middleware/errorHandler')
const catchAsyncErr=require('../middleware/catchAsyncErr')
const ApiFeatures=require('../Utils/apiFeatures')

exports.getProduct=async(req,res,next)=>{
    try{
        const resPerPage=3
       // let apiFeatures = new ApiFeatures(productModel.find(),req.query).search().filter().page(resPerPage)
       function builder(){
        return new ApiFeatures(productModel.find(),req.query).search().filter()
       }
       let filterCount=await builder().query
       filterCount=filterCount.length
       const totalProduct=await productModel.find()
       let totalCount=totalProduct.length;
       if(totalCount!==filterCount){
           totalCount=filterCount
       }
       let product=await builder().page(resPerPage).query

        res.status(200).json({
            success:true,
            resPerPage,
            count:totalCount,
            message:"Get Product SuccessFully",
            product
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
exports.getAdminProduct=async(req,res,next)=>{
    try{
        
        let product=await productModel.find()
        res.status(200).json({
            success:true,
            message:"Get Admin Product SuccessFully",
            product
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
exports.newProduct=catchAsyncErr(async(req,res,next)=>{
        let images=[]
        if(req.files.length>0){
            req.files.forEach(file=>{
                let url=`${req.protocol}://${req.get('host')}/uploads/product/${file.filename}`
                images.push({
                    image:url
                })
            })
        }
        req.body.images=images
        req.body.user=req.user.id
        console.log("id :",req.user.id)
        console.log("_id :",req.user._id)
        const product=await productModel.create(req.body)
        res.status(200).json({
            success:true,
            message:"Product Created SuccessFully",
            product
        })
    
    
})
exports.getSingleProduct=async(req,res,next)=>{
    
      const product=await productModel.findById(req.params.id).populate('reviews.user',"name email")
   
       if(!product){

           return next(new ErrorHandler("PRODUCT NOT FOUNDED",403))
       }
        
       res.status(200).json({
           success:true,
           message:"Get Single Product SuccessFully",
           product
        })
        
        
        
    }
    exports.updateProduct=async(req,res,next)=>{
    try{

        let product=await productModel.findById(req.params.id)
        
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product Not Found", 
            })
        }
        let images=[]
        if(req.body.isImageCleared=='no'){
            images=product.images
        }
        if(req.files.length>0){
            req.files.forEach((file)=>{
                let url=`${req.protocol}://${req.get('host')}/uploads/product/${file.filename}`
                images.push({
                    image:url
                })
            })
        }
        req.body.images=images
        product=await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        res.status(200).json({
            success:true,
            message:"Update Product SuccessFully",
            product
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
exports.deleteProduct=async(req,res,next)=>{
    try{
        
        let product=await productModel.findById(req.params.id)
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product Not Found", 
            })
        }
        product=await productModel.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success:true,
            message:"Delete Product SuccessFully",
            product
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
exports.createReview=catchAsyncErr(async (req,res,next)=>{
    const{productId,rating,comment}=req.body
    const reviews={
        user:req.user.id,
        rating,
        comment
    }
    let message
    const product=await productModel.findById(productId)
    if(!product){
        return next(new ErrorHandler("Product Not Found",404))
    }
    
    const isReviewed=product.reviews.find(review=>review.user.toString()==req.user._id.toString())
    console.log(isReviewed)
    console.log(req.user._id.toString())
    if(isReviewed){
        product.reviews.forEach(review=>{
            if(review.user.toString()==req.user.id.toString()){
                review.rating=rating
                review.comment=comment
                product.numofReviews=product.reviews.length
                message="Review Updated Successfully"
            }
            
        })
    }else{
        product.reviews.push(reviews)
        product.numofReviews=product.reviews.length
        message="Review Submitted Successfully"

    }
    const ratings=product.reviews.reduce((acc,review)=>{
        return acc+Number(review.rating)
    },0)/product.reviews.length
    
    console.log(product.reviews.length)
    console.log(ratings)
    product.rating=isNaN(ratings)?0:ratings

    await product.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
        message,
        product

    })


})
exports.getAllReview=catchAsyncErr(async (req,res,next)=>{
    const product=await productModel.findById(req.query.id)
    if(!product){
        return next(new ErrorHandler("Product Not Found",400))

    }
    res.status(200).json({
        success:true,
        message:"Get All Review",
        product:product.reviews
    })

})
exports.deleteReview=catchAsyncErr(async(req,res,next)=>{

    const product=await productModel.findById(req.query.productId)
    if(!product){
        return next(new ErrorHandler("Product Not Found",404))
    }
    const rating=product.reviews.find(review=>{return req.query.reviewId.toString() == review._id.toString() })
    if(!rating){
        return next(new ErrorHandler("Product Not Found cannot delete",404))
    }
    const filterItem=product.reviews.filter(review=>{
        return review._id.toString()!==req.query.reviewId.toString()
    })
    console.log(filterItem)
    product.reviews=filterItem
    product.numofReview=product.reviews.length
    const ratings=product.reviews.reduce((acc,review)=>{
        return acc+Number(review.rating)
    },0)/product.reviews.length
    
   
    product.rating=isNaN(ratings)?0:ratings

    await product.save({validateBeforeSave:false})
    res.status(200).json({
        success:true,
        message:"Review Deleted Successfully",
        review:product.reviews
        

    })
})