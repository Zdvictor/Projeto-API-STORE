const {check, validationResult} = require("express-validator")


const accountValidator = [

    check("email")
    .isEmail()
    .withMessage("E-mail Invalido")
    .normalizeEmail(),

    (req,res,next) => {

        const errors = validationResult(req)

        if(!errors.isEmpty() ) {

            const err = errors.array().map(err => err.msg)

            return res.status(400).json({err: err})

        }

        next()

    }

]

module.exports = accountValidator