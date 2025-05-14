const express=require("express")
const router=express.Router()
const {
    getProduct,newProduct,
    getSingleProduct,updateProduct,deleteProduct,
    createReview,getAllReview,deleteReview,getAdminProduct
} =require('../controllers/productController')
const {isAuthenticated,isAuthericedUser}=require('../middleware/Authenticate')
const path =require('path')
const multer =require('multer')
//Multer
const upload=multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,path.join(__dirname,'../uploads/product'))
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now()+"_"+file.originalname)
        }
    })
})

//Basic route 
router.route('/product').get(getProduct)
router.route('/admin/product').get(getAdminProduct)
router.route('/product/:id').get(getSingleProduct)
                            


router.route('/review').put(isAuthenticated,createReview)
//Admin Route
router.route('/product/new').post(isAuthenticated,isAuthericedUser('admin'),upload.array('images'),newProduct)
router.route('/review').get(isAuthenticated,isAuthericedUser('admin'),getAllReview)
                        .delete(isAuthenticated,isAuthericedUser('admin'),deleteReview)
router.route('/admin/product/:id').put(isAuthenticated,isAuthericedUser('admin'),upload.array('images'),updateProduct)
                                    .delete(isAuthenticated,isAuthericedUser('admin'),deleteProduct)                        

module.exports=router