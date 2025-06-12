const {check, validationResult} = require("express-validator")

const registerAdressValidator = [

    check("id")
    .isNumeric()
    .withMessage("ID Precisa ser um Numero"),

    check("cep")
    .isLength({min: 8})
    .withMessage("CEP Precisa ter no Minimo 8 letras"),

    check("number")
    .isNumeric()
    .withMessage("Numero Precisa ser um Numero"),

    check("neighborhood")
    .isLength({min: 4})
    .withMessage("Bairro Precisa ter no Minimo 4 letras"),

    check("street")
    .isLength({min: 4})
    .withMessage("Rua Precisa ter no Minimo 4 letras"),

    check("city")
    .isLength({min: 4})
    .withMessage("Cidade Precisa ter no Minimo 4 letras"),

    check("state")
    .isLength({min: 2})
    .withMessage("Estado Precisa ter no Minimo 2 letras"),

    (req,res,next) => {

        const errors = validationResult(req)

        if(!errors.isEmpty()) {

            const err = errors.array().map(err => err.msg)

            return res.status(400).json({err: err})


        }

        next()
    }

]

module.exports = registerAdressValidator