const express = require('express');
const router = express.Router();

router.use('/user', require("./user"));
router.use('/payment', require("./payment"));

module.exports = router;