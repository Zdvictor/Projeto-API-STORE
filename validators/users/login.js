const {check , validationResult} = require("express-validator")


const loginValidator = [

    check("email")
    .isEmail()
    .withMessage("E-mail Invalido")
    .normalizeEmail(), 

    check("password")
    .isLength({min: 4})
    .withMessage("Senha Fraca")
    .matches(/[A-Z]/)
    .withMessage("Pelo Menos 1 Letra Maiuscula")
    .matches(/[0-9]/)
    .withMessage("Pelo Menos 1 Numero"),


    (req,res,next) => {

        const errors = validationResult(req)

        if(!errors.isEmpty()) {

            const err = errors.array().map((err) => err.msg)

            return res.status(400).json({err})

        }

        next()


    }




]

module.exports = loginValidator