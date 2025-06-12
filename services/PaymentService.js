const db = require("../config/database")
const PaymentModel = require("../models/paymentModel")
const UserModel = require("../models/userModel")
const ProductsModel = require("../models/productsModel")
const OrderUtils = require("../utils/ordersUtils/order")
const FindDataUtils = require("../utils/ordersUtils/findData")


class PaymentService {

    async FindOrder(idUser) {

        var result = await PaymentModel.findAll(idUser)

        const orders = result.length > 0  ? OrderUtils(result) : []

        console.log("orders")
        console.log(orders)
        
        return orders
            

    }


    async FindDataForOrder(idUser,idProduct) {
 

        const user = await UserModel.getUserById(idUser)

        if(!user) throw new Error("Usuário não Encontrado")
        
        if(!user.endereco_id) throw new Error("Usuário Não Possui Endereço Cadastrado")

        const product = await ProductsModel.getProduct(idProduct)

        const data = FindDataUtils(user,product)

        return data
    
       
    } 

    async CreateOrder({idOrder, idUser, productsData, qrCode, qrCodeBase64, urlPayment, totalPrice, cellphone}) {

        try {

            await db.transaction(async (trx) => {

            for(let product of productsData) {


                await PaymentModel.createOrder(
                 idOrder,
                 idUser,
                 product.product.id_product,
                 product.product.size,
                 product.product.qtd,
                 qrCode,
                 qrCodeBase64,
                 urlPayment,
                 totalPrice,
                 cellphone,
                 trx
            )

            }

         })

            return true

            
        }catch(err) {

            console.log(err)
            throw new Error("Erro ao Criar Pedido")

        }

    }


    async PaidOrder(id) {

        await PaymentModel.paidOrder(id)

        return true

    }


    async CancelOrder(id) {

        const order = PaymentModel.findOrderById(id)

        if(!order) throw new Error("Pedido Não Encontrado")
            
        await PaymentModel.cancelOrder(id)

        return true

    }

    async DeleteOrder(id) {

        const order = PaymentModel.findOrderById(id)

        if(!order) throw new Error("Pedido Não Encontrado")

        await PaymentModel.deleteOrder(id)

        return true

    }




}

module.exports = new PaymentService()