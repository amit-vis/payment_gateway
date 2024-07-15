const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    payment_method:{
        type: String,
        enum:['credit_card', 'debit_card', 'digital_wallet'],
        required: true
    },
    status:{
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: "pending"
    }
},{
    timestamps:true
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment