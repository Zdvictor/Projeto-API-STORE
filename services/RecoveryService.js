const RecoveryModel = require("../models/recoveryModel")
const UserModel = require("../models/userModel")
const bcrypt = require("bcrypt")
const {v4} = require("uuid")

class RecoveryService {


    async SendRecovery(email) {

        const user = await UserModel.getUserByEmail(email)

        if(!user) throw new Error("Email Não Cadastrado")

        const code = v4()

        await RecoveryModel.deleteCode(email)

        await RecoveryModel.createCode(email,code)

        this.timeOutCode(code)

        return {user, code}

    }

    async verifyCode(code,email) {

        const dataCode = await RecoveryModel.getCode(email,code)

        if(!dataCode) throw new Error("Codigo Inválido")

        if(dataCode.isUsed === 1) throw new Error("Codigo Ja Usado")
        
        return true
        

    }

    async changePassword(code,newPassword) {

        
        const data = await RecoveryModel.dataCode(code)

        if(!data) throw new Error("Codigo Inválido")
            
        await this.verifyCode(code, data.email)

        const email = data.email
        const password = await bcrypt.hash(newPassword, 10)

        await UserModel.updatePassword(email, password)

        await RecoveryModel.setUsed(code)

        return

    }

    timeOutCode(code) {

        setTimeout(async () => {

            const data = await RecoveryModel.dataCode(code)
            await RecoveryModel.deleteCode(data.email)

        }, 1000 * 60 * 60 * 24)

    }

}


module.exports = new RecoveryService()