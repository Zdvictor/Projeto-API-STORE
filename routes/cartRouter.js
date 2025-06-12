const express = require("express")
const router = express.Router()

const CartController = require("../controllers/CartController")


//MIDDLEWARE
const AuthMiddleware = require("../middlewares/auth")
const CartGuard = require("../guards/cart/viewCartGuard")
const CartRegisterGuard = require("../guards/cart/registerProductCartGuard")
const DeleteProductCartGuard = require("../guards/cart/deleteProductCart")

//VALIDATORS
const ViewCartValidator = require("../validators/cart/viewValidatorCart")
const RegisterCartValidator = require("../validators/cart/registerValidator")
const DeleteCartValidator = require("../validators/cart/deleteValidator")

router.get("/cart/:id", AuthMiddleware, CartGuard, ViewCartValidator,  CartController.index)
router.post("/cart", AuthMiddleware, CartRegisterGuard, RegisterCartValidator, CartController.register)
router.put("/cart/update-quantity", AuthMiddleware, CartController.update)
router.delete("/cart/:id", AuthMiddleware, DeleteCartValidator, CartController.delete)




module.exports = router