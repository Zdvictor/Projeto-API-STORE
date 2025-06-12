const express = require("express")
const router = express.Router()

const ValidateController = require("../controllers/ValidateController")

//VALIDATORS
const accountValidator = require("../validators/account-validator/validator")

router.post("/generate_code", accountValidator, ValidateController.generate)
router.post("/validate_account", accountValidator, ValidateController.validate)


module.exports = router