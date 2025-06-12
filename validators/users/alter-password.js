const {check, validationResult} = require("express-validator")

const alterPasswordValidator = [

    check("currentlyEmail")
    .isEmail()
    .withMessage("E-mail Invalido")
    .normalizeEmail(),
    
    check("oldPassword")
    .isLength({min: 4})
    .withMessage("Senha Fraca")
    .matches(/[A-Z]/)
    .withMessage("Pelo Menos 1 Letra Maiuscula")
    .matches(/[0-9]/)
    .withMessage("Pelo Menos 1 Numero"),

    check("newPassword")
    .isLength({min: 4})
    .withMessage("Senha Fraca")
    .matches(/[A-Z]/)
    .withMessage("Pelo Menos 1 Letra Maiuscula")
    .matches(/[0-9]/)
    .withMessage("Pelo Menos 1 Numero"),

    (req,res,next) => {

        const errors = validationResult(req)

        if(!errors.isEmpty()) {

            const err = errors.array().map(err => err.msg)

            return res.status(400).json({err: err})

        }

        next()

    }


]

module.exports = alterPasswordValidator