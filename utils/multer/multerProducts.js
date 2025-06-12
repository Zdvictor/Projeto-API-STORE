const multer = require("multer")
const path = require("path")

const storagePhotoProducts = multer.diskStorage({

    destination: function(req,file,cb) {

        cb(null, "uploads/products/")

    },

    filename: function(req,file,cb) {

        cb(null, Date.now() + path.extname(file.originalname))

    }

})

module.exports = multer({storage: storagePhotoProducts})