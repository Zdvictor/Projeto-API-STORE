const {check, validationResult} = require("express-validator")

const editProductValidator = [

    check("id")
    .isNumeric()
    .withMessage("Precisa ser um Numero"),

    check("name")
    .optional()
    .isLength({min: 4})
    .withMessage("Nome Precisa ter no Minimo 4 letras"),

    check("description")
    .optional()
    .isLength({min: 30})
    .withMessage("Descricao Precisa ter no Minimo 30 letras"),

    check("price")
    .optional()
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


module.exports = editProductValidator