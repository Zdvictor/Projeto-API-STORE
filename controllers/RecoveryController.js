const RecoveryService = require("../services/RecoveryService")
const mailer = require("../utils/mail/mail")

class RecoveryController {

    async recovery(req,res) {

        const {email} = req.body

        try {

            const data = await RecoveryService.SendRecovery(email)

            mailer(data.user.name, email, data.code)

            return res.status(200).json({message: "Codigo Enviado com sucesso", code: data.code})


        }catch(err) {

            return res.status(500).json({err: err.message}) 

        }

    }

    async verify(req,res) {
        
        const {code,email} = req.body
    
        try {

            await RecoveryService.verifyCode(code,email)

            return res.status(200).json({message: "Codigo Valido"})


        }catch(err) {

            return res.status(500).json({err: err.message})

        }
    }


    async change(req,res) {

        const {code, newPassword} = req.body

        try {

            await RecoveryService.changePassword(code,newPassword)

            return res.status(200).json({message: "Senha Alterada com sucesso"})

        }catch(err) {

            return res.status(500).json({err: err.message})

         }

    }

}

    



module.exports = new RecoveryController()