const express = require("express")
const router = express.Router()

const UserController = require("../controllers/UserController")

const uploadUser = require("../utils/multer/multerUser")

//VALIDATE LOGIN
const loginValidator = require("../validators/users/login")
const registerValidator = require("../validators/users/register")
const UpdateValidator = require("../validators/users/update")
const UploadPhotoProductValidator = require("../validators/products/uploadPhotoProducts")
const alterPasswordValidator = require("../validators/users/alter-password")


//GUARD
const UpdateGuard = require("../guards/users/updateGuard")
const DeleteGuard = require("../guards/users/deleteGuard")
const UploadGuard = require("../guards/users/uploadGuards")


//MIDDLEWARE
const AuthMiddleware = require("../middlewares/auth")
const AuthGoogleMiddleware = require("../middlewares/authGoogle")
const apiLimiter = require("../middlewares/rateLimiter")


router.get("/my_profile", AuthMiddleware, UserController.profile)
router.post("/logout", AuthMiddleware, UserController.logout)
router.post("/login", loginValidator, UserController.login)
router.post("/register", registerValidator, AuthGoogleMiddleware, UserController.register)
router.post("/upload_user/:id",AuthMiddleware, uploadUser.single("image"), UploadPhotoProductValidator, UploadGuard, UserController.upload)
router.put("/user",apiLimiter, AuthMiddleware, UpdateGuard, UpdateValidator, UserController.update)
router.delete("/user", AuthMiddleware, DeleteGuard, UserController.delete)
router.post("/alter_password", apiLimiter, AuthMiddleware, alterPasswordValidator, UserController.change)




module.exports = router