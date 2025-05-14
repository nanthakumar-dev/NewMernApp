const express=require('express')
const router=express.Router()
const {
    register,login,logout,forgotPassword,resetPassword,
    myProfile,changePassword,updateProfile,getAllUser,getSingleUser,updateUser,deleteUser
} =require('../controllers/userController')
const {isAuthenticated,isAuthericedUser}=require('../middleware/Authenticate')
const multer=require('multer')
const path=require('path')

//Multer
const upload=multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,path.join(__dirname,'../uploads/user'))
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now()+"_"+file.originalname)
        }
    })
})

//Basic Routes

router.route('/register').post(upload.single('avatar'),register)
router.route('/login').post(login)
router.route('/logout').post(logout).get(logout)
router.route('/logout').post(logout).get(logout)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').post(resetPassword)
router.route('/myprofile').get(isAuthenticated,myProfile)
router.route('/password/change').put(isAuthenticated,changePassword)
router.route('/update').put(isAuthenticated,upload.single('avatar'),updateProfile)

//Admin Routes

router.route('/admin/user').get(isAuthenticated,isAuthericedUser('admin'),getAllUser)
router.route('/admin/user/:id').get(isAuthenticated,isAuthericedUser('admin'),getSingleUser)
                            .put(isAuthenticated,isAuthericedUser('admin'),updateUser)
                            .delete(isAuthenticated,isAuthericedUser('admin'),deleteUser)

module.exports=router