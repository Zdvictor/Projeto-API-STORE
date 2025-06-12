const express = require("express")
const router = express.Router()

const ReviewController = require("../controllers/ReviewController")

//MIDDLEWARES
const AuthMiddleware = require("../middlewares/auth")


router.get("/reviews", ReviewController.all)
router.get("/review/:idProduct", ReviewController.find)
router.get("/review/slug/:slug", ReviewController.findBySlug)

module.exports = router