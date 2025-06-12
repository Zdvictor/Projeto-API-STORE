const {check , validationResult} = require("express-validator")

const ViewValidator = [

    check("id")
    .notEmpty()
    .withMessage("ID é obrigatório"),

    (req,res,next) => {

        const errors = validationResult(req)

        if(!errors.isEmpty() ) {

            const err = errors.array().map(err => err.msg)

            return res.status(400).json({err: err})
        }

        return next()

    }

    
]

module.exports = ViewValidator