const AdressModel = require("../models/adressModel")
const UserModel = require("../models/userModel")

class Adress {


    async AddAdress(id, num,neigh,street,city,state,cep) {

        const user = await UserModel.getUserById(id)

        if(!user) throw new Error("Usuário Não Encontrado")

        const idAdress = await AdressModel.AddAdress(num,neigh,street,city,state,cep)

        await UserModel.updateAdress(id, idAdress)

        return user

    }



    async UpdateAdress(id, num,neigh,street,city,state,cep) {

        const user = await UserModel.getUserById(id)

        if(!user) throw new Error("Usuário Não Encontrado")

        const idAdress = user.endereco_id

        if(!idAdress) throw new Error("Usuário Não Possui Endereço")
        
        await AdressModel.updateAdress(idAdress, num,neigh,street,city,state,cep)

        return user


    }

    async RemoveAdress(idUser) {

        const user = await UserModel.getUserById(idUser)
        
        if(!user) throw new Error("Usuário Não Encontrado")

        const idAdress = user.endereco_id

        if(!idAdress) throw new Error("Usuário Não Possui Endereço")

        await AdressModel.deleteAdress(idAdress)

        return true

    }

}

module.exports = new Adress()