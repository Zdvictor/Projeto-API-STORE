const express = require("express")
const router = express.Router()

const CouponsController = require("../controllers/CouponsController")


router.get("/coupons", CouponsController.all)
router.post("/coupons", CouponsController.find)
router.delete("/coupons", CouponsController.delete)

module.exports = router