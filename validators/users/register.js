const { check } = require("express-validator")

const validatorCPF = require("./cpf-validator")

const loginValidator = require("./login")

const registerValidator = [

    check("name")
    .isLength({min: 4})
    .withMessage("Nome Precisa ter no Minimo 4 letras"),

    check("cpf")
    .custom((value) => {

        const result = validatorCPF(value)

        if(!result.status) {

            throw new Error("CPF inválido");

        }

        return true
    }),

    check("birthAt")
    .isLength({min: 5})
    .withMessage("Data Invalida"),

    ...loginValidator

]

module.exports = registerValidator