const jwt = require("jsonwebtoken")
require('dotenv').config();

const moment = require('moment-timezone');
require('moment/locale/pt-br');

moment.locale('pt-br');
const secret = process.env.JWT_SECRET
console.log(secret)

module.exports = function (result) {


    return jwt.sign(
        {
            id: result.id,
            name: result.name,
            cpf: result.cpf,
            birthAt: result.birthat,
            email: result.email,
            admin: result.admin,
            endereco_id: result.endereco_id,
            registered: moment.utc(result.created_at).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss'),
            image: result.image,
            hasValidated: result.hasValidated,
            isGoogle: result.isGoogle,
            number: result.adress ? result.adress.numero : null,
            neighborhood: result.adress ? result.adress.bairro : null,
            street: result.adress ? result.adress.rua : null,
            city: result.adress ? result.adress.cidade : null,
            state: result.adress ? result.adress.estado : null,
            cep: result.adress ? result.adress.cep : null,

        }
        , secret, {expiresIn: "24h"},)


}