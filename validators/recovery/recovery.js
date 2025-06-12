const {check, validationResult} = require("express-validator")

recoveryValidator = [

    check("newPassword")
    .isLength({min: 4})
    .withMessage("Senha Fraca")
    .matches(/[A-Z]/)
    .withMessage("Pelo Menos 1 Letra Maiuscula")
    .matches(/[0-9]/)
    .withMessage("Pelo Menos 1 Numero"),

    (req, res, next) => {

        const errors = validationResult(req)
        const err = errors.array().map( err => err.msg )

        if(!errors.isEmpty()) {

            return res.status(400).json({error: err })

        }

        next()

    }

]

module.exports = recoveryValidator