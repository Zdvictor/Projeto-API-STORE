const {check, validationResult} = require("express-validator")

const deleteProductValidator = [

    check("id")
    .isNumeric()
    .withMessage("Precisa ser um Numero"),

    (req,res,next) => {

        const errors = validationResult(req)

        if(!errors.isEmpty()) {

            const err = errors.array().map(err => err.msg)

            return res.status(400).json({err: err})

        }

        next()

    }

]

module.exports = deleteProductValidator