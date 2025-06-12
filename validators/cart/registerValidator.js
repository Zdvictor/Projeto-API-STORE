const {check, validationResult} = require("express-validator")

const registerValidatorCart = [

    check("idUser")
    .notEmpty()
    .withMessage("ID é obrigatório"),

    check("size")
    .notEmpty()
    .withMessage("Tamanho é obrigatório"),

    check("qtd")
    .isNumeric()
    .withMessage("Precisa ser um Numero"),



    (req,res,next) => {

        const errors = validationResult(req)

        if(!errors.isEmpty()) {
            
            const err = errors.array().map(err => err.msg)

            return res.status(400).json({err: err})

        } 

        return next()

    }

]


module.exports = registerValidatorCart