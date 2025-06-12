const CartModel = require("../models/cartModel")
const UserModel = require("../models/userModel")
const ProductModel = require("../models/productsModel")

class Cart {

    async ViewProduct(id) {
            
        if(!(await UserModel.getUserById(id))) throw new Error("Usuário Não Encontrado")

        const product = await CartModel.getProduct(id)

        return product

    }

    async RegisterProduct(idUser, idProduct, size, qtd) {

        if(!(await UserModel.getUserById(idUser))) throw new Error("Usuário Não Encontrado")

        if(!(await ProductModel.getProduct(idProduct))) throw new Error("Produto Não Encontrado")
        
        const products = await CartModel.getProduct(idUser)

        const hasProductInCart = products.find(product => product.id_user == idUser && product.id_product == idProduct && product.size === size)

        if(hasProductInCart && hasProductInCart.qtd + qtd > 10) return this.UpdateProduct(hasProductInCart.id, 10)

        if(hasProductInCart) return this.UpdateProduct(hasProductInCart.id, hasProductInCart.qtd + qtd)

        await CartModel.insertProduct(idUser,idProduct, size, qtd)

        return true

    }

    async UpdateProduct(id,qtd) {
        
        if(!(await CartModel.findCart(id))) throw new Error("Carrinho Não Encontrado")
        
        await CartModel.updateProduct(id, qtd)

        return true

    }


    async DeleteProduct(id) {

        await CartModel.DeleteProduct(id)

        return true

    }

}



module.exports = new Cart()