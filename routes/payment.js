const express = require('express');
const router = express.Router();
const paymentController = require("../controller/payment_controller");
const passport = require('passport');

router.post("/create-payment", passport.authenticate('jwt', {session: false}), paymentController.createPayment);
router.patch("/process/:id", passport.authenticate('jwt', {session: false}), paymentController.processPayment);
router.get("/getpayment/:id", passport.authenticate('jwt', {session: false}), paymentController.getPayment);
router.patch("/refund/:id", passport.authenticate('jwt', {session: false}), paymentController.handleRefund);

module.exports = router;