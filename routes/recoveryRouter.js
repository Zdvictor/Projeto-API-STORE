const express = require("express")
const router = express.Router()

const RecoveryController = require("../controllers/RecoveryController")

//VALIDATOR
const recoveryValidator = require("../validators/recovery/recovery")


router.post("/recovery", RecoveryController.recovery)
router.post("/verify_code", RecoveryController.verify)
router.put("/change_password", recoveryValidator, RecoveryController.change)

module.exports = router