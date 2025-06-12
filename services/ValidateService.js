const UserModel = require("../models/userModel")
const ValidatorModel = require("../models/ValidateModel")
const {v4} = require("uuid")


class ValidateService {

    async generateCode(email) {

        const user = await UserModel.getUserByEmail(email)

        if(!user) throw new Error("Email Não Cadastrado")

        if(user.hasValidated === 1) throw new Error("Email Ja Validado")

        const code = v4()

        await ValidatorModel.deleteCode(email)

        await ValidatorModel.createCode(email,code)

        this.timeOutCode(code)

        return {user, code}


    }

    async validateCode(email,code) {

        const dataCode = await ValidatorModel.getCode(email,code)

        if(!dataCode) throw new Error("Codigo Inválido")

        if(dataCode.isUsed === 1) throw new Error("Codigo Ja Usado")
        
        await UserModel.validateUser(email)
        await ValidatorModel.setUsed(code)
        
        return true
        

    }


    timeOutCode(code) {

        setTimeout(async () => {

            const data = await ValidatorModel.dataCode(code)
            await ValidatorModel.deleteCode(data.email)

        }, 1000 * 60 * 60 * 24)

    }

}


module.exports = new ValidateService()