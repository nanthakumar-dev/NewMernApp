const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.paymentProcess=async(req,res,next)=>{
    console.log(process.env.STRIPE_SECRET_KEY)
    try{
        
        console.log(process.env.STRIPE_SECRET_KEY)
        const paymentIntent=await stripe.paymentIntents.create({
            amount:req.body.amount,
            currency:'usd',
            description:"Sample Sending Amount",
            shipping:req.body.shipping
        })
        res.status(200).json({
            sucess:true,
            client_secret:paymentIntent.client_secret
        })
    }
    catch(err){
        console.log(err)
        res.status(404).json({
            sucess:false,
            error:err.message
        })
    }
}
exports.stripeApiKey=async (req,res,next)=>{
    res.status(200).json({
        success:true,
        stripApiKey:process.env.STRIPE_API_KEY
    })
}