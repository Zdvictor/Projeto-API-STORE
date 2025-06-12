const {check, validationResult} = require("express-validator")

const UpdateValidator = [

    check("name")
    .notEmpty()
    .withMessage("Nome é obrigatório")
    .isLength({min: 4})
    .withMessage("Nome Precisa ter no Minimo 4 letras"),

    (req, res, next) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {

            const err = errors.array().map(err => err.msg)

            return res.status(400).json({ error: err })

        }

        next()

    }

]

module.exports = UpdateValidator




