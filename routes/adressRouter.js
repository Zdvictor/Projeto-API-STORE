const express = require("express")
const router = express.Router()

const AdressController = require("../controllers/AdressController")

const AuthMiddleware = require("../middlewares/auth")

//VALIDATORS
const AdressValidator = require("../validators/adress/registerAdress")

//GUARD
const AdressGuard = require("../guards/adress/adressGuard")
const UpdateAdressGuard = require("../guards/adress/updateGuardAdress")
const DeleteGuard = require("../guards/adress/deleteAdressGuard")


//MIDLEWARES
const apiLimiter = require("../middlewares/rateLimiter")



router.post("/adress", AuthMiddleware, AdressValidator, AdressGuard, AdressController.adress)
router.put("/adress", apiLimiter,  AuthMiddleware, UpdateAdressGuard, AdressController.update)
router.delete("/adress/:id", AuthMiddleware, DeleteGuard, AdressController.delete)


module.exports = router