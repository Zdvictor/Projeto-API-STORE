const CartService = require("../services/CartService")

class CartController {

    async index(req,res) {

        const id = req.params.id

        try {

            const product = await CartService.ViewProduct(id)

            return res.status(200).json(product)

        }catch(err) {

            return res.status(500).json({err: err.message}) 

        }

    }

    async register(req,res) {

        const {idUser, idProduct, size, qtd} = req.body

        try {

            await CartService.RegisterProduct(idUser,idProduct, size, qtd)

            return res.status(200).json({msg: "Produto Adicionado ao Carrinho"})


        }catch(err) {

            return res.status(500).json({err: err.message})
            
        }


    }

    async update(req,res) {

        const {id, qtd} = req.body

        console.log("Passou aqui")

        try {

            await CartService.UpdateProduct(id,qtd)

            return res.status(200).json({msg: "Quantidade de Produto Atualizado"})


        }catch(err) {

            return res.status(500).json({err: err.message})

        }

    }

    async delete(req,res) {

        const {id} = req.params

        try {

            await CartService.DeleteProduct(id)

            return res.status(200).json({msg: "Produto Removido do Carrinho"})


        }catch(err) {

            return res.status(500).json({err: err.message})

        }
    }

}


module.exports = new CartController()