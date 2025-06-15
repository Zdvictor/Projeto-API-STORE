const UserService = require("../services/UserService");
const createJWT = require("../utils/jwt/jwt");
const generateCookie = require("../utils/cookie/generate");

class UserController {
  async profile(req, res) {

    console.log(req.user)
    return res.status(200).json(req.user)

  }

  async login(req, res) {
    
    const { email, password } = req.body


    try {
      const user = await UserService.signin(email, password)
      console.log(user)
      const token = createJWT(user)

      generateCookie(res, token)

      return res.status(200).json({ message: "Login realizado com sucesso", data: user })

    } catch (err) {

      return res.status(401).json({ err: err.message })

    }
  }

  async register(req, res) {

    const { name, cpf, email, password, birthAt, hasValidated, isGoogle } = req.body

    console.log(req.body)

    try {

      const user = await UserService.signup(name, cpf, email, password, birthAt,hasValidated, isGoogle)

      const token = createJWT(user)

      generateCookie(res, token)

      return res.status(201).json({ message: "Cadastro realizado com sucesso", data: user.data })

    } catch (err) {
      return res.status(400).json({ err: err.message })
    }
  }

  async upload(req, res) {

    const id = req.params.id

    const imagePath = req.file.path
    const path = imagePath.split("\\").pop()

    console.log("Passou aqui")

    try {

      await UserService.uploadImage(id, path)
      return res.status(200).json({ message: "Imagem salva com sucesso"})

    } catch (err) {

      return res.status(500).json({ err: err.message })

    }
  }

  async update(req, res) {

    const {currentlyEmail, name, birthat} = req.body

    try {

      const user = await UserService.update(currentlyEmail, name, birthat)
      const token = createJWT(user)
      generateCookie(res, token)
      return res.status(200).json({ message: "Usuário atualizado com sucesso" })

    } catch (err) {
      return res.status(500).json({ err: err.message })
    }
  }

  async delete(req, res) {
    
    const { email } = req.body;

    try {

      await UserService.deleteByEmail(email)

      res.clearCookie("token", { 
        httpOnly: true, 
        secure: true, 
        sameSite: "none" 
    });

      return res.status(200).json({ message: "Usuário deletado com sucesso" })

    } catch (err) {

      return res.status(400).json({ err: err.message })

    }

  }

  async change(req,res) {

    const {currentlyEmail, oldPassword, newPassword} = req.body

    try {

      const user = await UserService.changePassword(currentlyEmail, oldPassword, newPassword)
      
      const token = createJWT(user)

      generateCookie(res, token)

      return res.status(200).json({message: "Senha Alterada com sucesso"})


    }catch(err) {

      return res.status(500).json({err: err.message})

    }

  }

  logout(req, res) {

    res.clearCookie("token", { 
      httpOnly: true, 
      secure: true, 
      sameSite: "none" 
  });

    return res.status(200).json({ message: "Logout efetuado com sucesso!" })
  }
}

module.exports = new UserController()
