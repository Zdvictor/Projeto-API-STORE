const express = require("express")
const router = express.Router()


const ShippingController = require("../controllers/ShippingController")

router.get("/calc-shipping", ShippingController.shipping)


module.exports = router