const ProductsService = require("../services/ProductsService")


class ProductsController {

    async all(req,res) {

        try {

            const products = await ProductsService.AllProducts()

            return res.status(200).json(products)


        }catch(err) {

            return res.status(500).json({err: err.message})

        }

    }

    async find(req,res) {

        const { id }   = req.params

        try {

            const product = await  ProductsService.FindOne(id)

            return res.status(200).json(product)

        }catch(err) {

            console.log(err)
            return res.status(500).json({err: err.message})
        }

    }

    async findBySlug(req,res) {

        const { slug } = req.params

        try {

            const product = await ProductsService.FindBySlug(slug)
            console.log("Passou aqui slug")
            console.log(product)
            return res.status(200).json(product)

        }catch(err) {

            return res.status(500).json({err: err.message})

        }
    }

    async offers(req,res) {

        try {

            const products = await ProductsService.AllOffers()

            return res.status(200).json(products)


        }catch(err) {


            return res.status(500).json({err: err.message})

        }

    }

    async lendary(req,res) {

        try {

            const products = await ProductsService.AllLendarysJerseys()

            return res.status(200).json(products)


        }catch(err) {

            return res.status(500).json({err: err.message})

        }
    }

    async register(req,res) {

        const {name,description,price} = req.body
    
        try {

            const id = await ProductsService.SaveProducts(name,description,price)
            return res.status(200).json({msg: "Produto Cadastrado com sucesso", id: id})

        }catch(err) {

            return res.status(500).json({err: err.message})

        }

    }

    async upload(req,res) {

        const {id} = req.params

        const imagePath = req.file.path
        const path = imagePath.split('\\').pop()

        try {

            await ProductsService.UploadImage(id,path)
            return res.status(200).json({msg: "Imagem salva com sucesso"})


        }catch(err) {

            return res.status(500).json({err: err.message})

        }


    }

    async update(req,res) {

        const {id} = req.params

        const {name,description,price} = req.body

        try {

            await ProductsService.EditProducts(id,name,description,price)
            return res.status(200).json({msg: "Produto Atualizado com sucesso"})

        }catch(err) {

            return  res.status(500).json({err: err.message})

        }

    }

    async delete(req,res) {

        const id = req.params.id
        
        try {

            await ProductsService.removeProducts(id)
            return res.status(200).json({msg: "Produto Removido com sucesso"})


        }catch(err) {

            return res.status(500).json({err: err.message})

        }
        

    }


}


module.exports = new ProductsController()