const AdressService = require("../services/AdressService")
const UserService = require("../services/UserService")
const createJWT = require("../utils/jwt/jwt")
const generateCookie = require("../utils/cookie/generate")


//RELOGAR O USUARIO QUANDO REGISTRAR OU ALTERAR UM ENDERECO (GERAR NOVO TOKEN JWT E COOKEI PARA O USUARIO NO FRONT-END)
//FAZER UMA LOGICA SE USUARIO JA TIVER ENDERECO JOGA NO UPDATE SE NAO JOGA NO CRIAR NOVO ENDERECO PARA NAO PESAR NO DB

class AdressController {

    async adress(req,res) {

        const {id, number,neighborhood,street,city,state,cep} = req.body

        try {
            
            const data = await AdressService.AddAdress(id, number,neighborhood,street,city,state,cep)

            const user = await UserService.dataUser(data.email)

            console.log(user)

            const token = createJWT(user)

            generateCookie(res, token)

            return res.status(200).json({msg: "Endereço Cadastrado Com Sucesso"})

        }catch(err) {

            return res.status(500).json({err: err.message})

        }

    }

    async update(req,res) {

        const {id, number,neighborhood,street,city,state,cep} = req.body

        try {

            const data = await AdressService.UpdateAdress(id, number,neighborhood,street,city,state,cep)
    
            const user = await UserService.dataUser(data.email)

            const token = createJWT(user)

            generateCookie(res, token)


            return res.status(200).json({msg: "Endereço Atualizado Com Sucesso"})


        }catch(err) {

            return res.status(500).json({err: err.message})

        }

    }

    async delete(req,res) {

        const id = req.params.id

        try {

            await AdressService.RemoveAdress(id)

            return res.status(200).json({msg: "Endereço Removido Com Sucesso"})


        }catch(err) {

            return res.status(500).json({err: err.message}) 

        }


    }

}

module.exports = new AdressController()