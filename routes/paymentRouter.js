const express = require("express")
const router = express.Router()
const PaymentController = require("../controllers/PaymentController")

//MIDDLEWARES
const AuthMiddleware = require("../middlewares/auth")

//GUARDS
const ViewPaymentGuard = require("../guards/payment/viewPayments")
const CreatePaymentGuard = require("../guards/payment/createPayment")
const CancelPayment = require("../guards/payment/cancelPayment")
const DeletePayment = require("../guards/payment/deletePayment")

router.get("/order/:id", AuthMiddleware, PaymentController.FindOrders)
router.post("/create_payment", AuthMiddleware, CreatePaymentGuard, PaymentController.Payment)
router.post("/cancel_payment/:id",AuthMiddleware, CancelPayment, PaymentController.Cancel)
router.delete("/delete_payment/:id",AuthMiddleware, DeletePayment, PaymentController.Delete)
router.post("/notification", PaymentController.Notification)


module.exports = router


