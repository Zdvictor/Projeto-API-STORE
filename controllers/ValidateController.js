const ValidatorService = require("../services/ValidateService")
const mailerValidate = require("../utils/mail/mailValidate")
const createJWT = require("../utils/jwt/jwt")

class ValidateController {

    async generate(req, res) {

        const {email} = req.body

        console.log("Passou aqui")

        try {

            const data = await ValidatorService.generateCode(email)

            mailerValidate(data.user.name, email, data.code)

            return res.status(200).json({message: "Codigo Enviado com sucesso"})

        }catch(err) {

            console.log(err)
            return res.status(500).json({err: err.message})

        }
 
    }

    async validate(req,res) {

        const {email, code, user} = req.body


        try {

            await ValidatorService.validateCode(email,code)

            user.hasValidated = 1
            const token = createJWT(user)
            console.log(token)

            res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" })

            return res.status(200).json({message: "Email validado com sucesso"})


        }catch(err) {

            console.log(err)

            return res.status(500).json({err: err.message})

        }

    }

}

module.exports = new ValidateController()