const { cpf } = require("cpf-cnpj-validator")

 module.exports = function validateCpf(numCpf)  {

    var isValid = cpf.isValid(numCpf)


    if(isValid) {

        return {status: true, msg: "Cpf Valido"}
    }else {

        return {status: false, msg: "Cpf Invalido"}
    }

}