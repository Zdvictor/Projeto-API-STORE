const express = require("express")
const router = express.Router()

const ProductsController = require("../controllers/ProductsController")

//MULTER
const storageProducts = require("../utils/multer/multerProducts")

//Middlewares
const AuthMiddleware = require("../middlewares/auth")
const AdminMiddleware = require("../middlewares/admin")

//Validators
const RegisterProductsValidator = require("../validators/products/registerProducts")
const EditProductsValidator = require("../validators/products/editProducts")
const DeleteProductValidator = require("../validators/products/deleteProducts")
const UploadPhotoProductValidator = require("../validators/products/uploadPhotoProducts")

router.get("/products", ProductsController.all)
router.get("/product/:id", ProductsController.find)
router.get("/product/slug/:slug", ProductsController.findBySlug)
router.get("/best_offers", ProductsController.offers)
router.get("/lendary_jerseys", ProductsController.lendary)
router.post("/products", AuthMiddleware, AdminMiddleware, RegisterProductsValidator, ProductsController.register)
router.post("/upload_product/:id", AuthMiddleware, AdminMiddleware, storageProducts.single("image"),  UploadPhotoProductValidator, ProductsController.upload)
router.put("/products/:id",  AuthMiddleware, AdminMiddleware, EditProductsValidator, ProductsController.update)
router.delete("/products/:id", AuthMiddleware, AdminMiddleware, DeleteProductValidator, ProductsController.delete)


module.exports = router