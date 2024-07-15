const Payment = require("../model/payment");

module.exports.createPayment = async (req, res)=>{
    try {
        let payment = await Payment.create({
            user_id: req.user._id,
            amount: req.body.amount,
            payment_method: req.body.payment_method,
            status: req.body.status
        });
        return res.status(200).json({
            message: "Your payment is created!",
            success: true,
            payment
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error in creating the payment!",
            error: error.message
        })
    }
}

module.exports.processPayment = async (req, res)=>{
    try {
        const payment = await Payment.findById(req.params.id);
        if(!payment){
            return res.status(400).json({
                message:"Payment not found!",
                success: false
            })
        }
        payment.status = req.body.status;
        await payment.save();
        return res.status(200).json({
            message:"payment processed status!",
            success: true,
            payment
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error in processing the payment!",
            error: error.message
        })
    }
}

module.exports.getPayment = async (req, res)=>{
    try {
        const payment = await Payment.findById(req.params.id);
        if(!payment){
            return res.status(400).json({
                message:"Payment not found!",
                success: false
            })
        }
        return res.status(200).json({
            message: "check the payment status",
            success: false,
            payment
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error in getting the payment status!",
            error: error.message
        })
    }
}

module.exports.handleRefund = async (req, res)=>{
    try {
        const payment = await Payment.findById(req.params.id);
        if(!payment){
            return res.status(400).json({
                message:"Payment not found!",
                success: false
            })
        }
        payment.status = "refunded";
        await payment.save();
        return res.status(200).json({
            message:"payment refunded successfully!",
            success: true,
            payment
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error in refunding the payment!",
            error: error.message
        })
        
    }
}