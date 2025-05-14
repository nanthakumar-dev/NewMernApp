const express=require('express')
const router=express.Router()
const {
    getAllOrder,newOrder,getSingleOrder,updateOrder,deleteOrder,myOrder
}=require('../controllers/orderController')
const {isAuthenticated,isAuthericedUser}=require('../middleware/Authenticate')

router.route('/myorder').get(isAuthenticated,myOrder)
router.route('/order/:id').get(isAuthenticated,getSingleOrder)
router.route('/order/new').post(isAuthenticated,newOrder)
//Admin Routes
router.route('/admin/order').get(isAuthenticated,isAuthericedUser("admin"),getAllOrder)
router.route('/admin/order/:id').put(isAuthenticated,isAuthericedUser("admin"),updateOrder)
                            .delete(isAuthenticated,isAuthericedUser("admin"),deleteOrder)


module.exports=router