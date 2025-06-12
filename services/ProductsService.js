const ProductsModel = require("../models/productsModel")


class ProductsService {


    async AllProducts() {

        const products = await ProductsModel.getAllProducts()

        if(products.length < 0)  throw new Error("Lista de Produtos Vazia")

        return products

    }


    async FindOne(idProduct) {

        const product = await ProductsModel.getProduct(idProduct)

        if(!product) throw new Error("Produto Não Encontrado")

        return product

    }

    async FindBySlug(slug) {

        const product = await ProductsModel.getProductBySlug(slug)

        if(!product) throw new Error("Produto Não Encontrado")

        return product

    }

    async AllOffers() {

        const products = await ProductsModel.getAllOffers()


        if(products.length < 0) throw new Error("Lista de Ofertas Vazia")

        return products

        

    }

    async AllLendarysJerseys() {

        const products = await ProductsModel.getAllLendarys()

        if(products.length < 0) throw new Error("Lista de Camisas Lendárias Vazia")

        return products

    }
    
    async SaveProducts(name,description,price) {

        const id = await ProductsModel.registerProduct(name,description,price)

        return id

    }


    async EditProducts(id,name,description,price) {

        await this.findProductsById(id)

        await ProductsModel.editProduct(id,name,description,price)

        return true

    }

    async removeProducts(id) {

        await this.findProductsById(id)

        await ProductsModel.deleteProduct(id)
        
        return true
    }

    async UploadImage(id,path) {

        await this.findProductsById(id)

        await ProductsModel.uploadPhoto(id,path)

        return true

    }

    async findProductsById(id) {

        if(!(await ProductsModel.getProduct(id))) throw new Error("Produto Não Encontrado")

        return true


    }

}


module.exports = new ProductsService()