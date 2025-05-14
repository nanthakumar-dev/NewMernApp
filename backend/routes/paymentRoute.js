const express=require('express')
const router=express.Router()
const {paymentProcess,stripeApiKey}=require('../controllers/paymentController')

router.route('/payment/process').post(paymentProcess)
router.route('/payment/api').get(stripeApiKey)

module.exports=router