const userModel = require("../models/userModel");
const AdressModel = require("../models/adressModel")
const bcrypt = require("bcrypt");

class UserService {

  async dataUser(email) {

    const user = await userModel.getData(email)

    if (!user) throw new Error("Nenhum usuário encontrado")
    
    if(user.endereco_id) {
      const adress = await AdressModel.getAdressById(user.endereco_id)
      user.adress = adress
    }


    return user

  }

  async signin(email, password) {

    const user = await userModel.getUserByEmail(email)

    if (!user) throw new Error("Email e/ou senha incorretos")

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) throw new Error("Email e/ou senha incorretos")
    
    return this.dataUser(email)
  }

  async signup(name, cpf, email, password, birthAt, hasValidated, isGoogle) {

    const emailExists = await userModel.getUserByEmail(email);
    const cpfExists = await userModel.getUsers().where({ cpf }).first()

    if (emailExists) throw new Error("O email já está cadastrado")

    if (cpfExists) throw new Error("O CPF já está cadastrado")

    const hashedPassword = await bcrypt.hash(password, 10)
    const [user] = await userModel.createUser(name, cpf, email, hashedPassword, birthAt, hasValidated, isGoogle)

    if (!user) throw new Error("Erro ao cadastrar usuário")

    if(!isGoogle) setTimeout( async () => await this.deleteByEmail(email), 1000 * 60 * 60 * 24)

    return this.dataUser(email)

  }

  async deleteByEmail(email) {

    const user = await userModel.getUserByEmail(email)
    
    if (!user) throw new Error("Usuário não encontrado")
    
    await userModel.deleteUser(email)

    return true
  }

  async update(emailAtual, name, birthat) {

    const user = await userModel.getUserByEmail(emailAtual)

    if (!user) throw new Error("Usuário não encontrado")

    const updatedUser = await userModel.updateUser(emailAtual, name, birthat )

    if (!updatedUser) throw new Error("Erro ao atualizar o usuário")

    const newUserData = await this.dataUser(emailAtual)

    return newUserData

  }

  async uploadImage(id, path) {

    const updatedUser = await userModel.updateId(id, {path})

    if (!updatedUser) throw new Error("Erro ao salvar a imagem");
  
    return true
  }

  async changePassword(currentlyEmail, oldPassword, newPassword) {

    const user = await userModel.getUserByEmail(currentlyEmail)

    if(!user) throw new Error("Usuário não encontrado")
    
    const isValid = await bcrypt.compare(oldPassword, user.password)

    if(!isValid) throw new Error("Senha atual incorreta")

    if(oldPassword === newPassword) throw new Error("Nova senha deve ser diferente da senha atual")

    const hash = await bcrypt.hash(newPassword, 10)

    await userModel.updatePassword(currentlyEmail, hash)

    return user
    

  }

}

module.exports = new UserService();
