const {CardToken, MercadoPagoConfig, Payment, PaymentMethod, Preference}  = require('mercadopago');
const PaymentService = require("../services/PaymentService");
const PaymentPayload = require('../utils/payment/paymentPayload');
const PaymentLinks = require('../utils/payment/paymentLinks');
const CalcShipping = require('../utils/shipping/shipping');
const {getIo} = require("../utils/socket/socketManager");
console.log(getIo)

require('dotenv').config();

const token = process.env.MP_TOKEN

const client = new MercadoPagoConfig({
    
    accessToken: token

})

const payment = new Payment(client);

class PaymentController {

    async FindOrders(req,res) {

        const {id} = req.params

        try {

            const payments = await PaymentService.FindOrder(id)

            console.log("payments")

            return res.status(200).json(payments)


        }catch(err) {


            return res.status(500).json({err: err.message})

        }

    }

    async Payment(req,res) {

      const {idUser, products, cellphone, cepDestination, coupon} = req.body

      try {

        let totalPrice = 0;
        let totalQtd = 0

        const productDataPromises = products.map(async (product) => {

          let prod = await PaymentService.FindDataForOrder(product.id_user, product.id_product)
          prod.product.id_product = product.id_product
          prod.product.qtd = product.qtd
          prod.product.size = product.size

          totalPrice += Number((prod.product.price * product.qtd).toFixed(2))
          totalQtd += product.qtd

          return prod

        })


        //AGUARDA AS PROMISE LA DE CIMA E AQUI RETORNA AS PROMISES LA DE CIMA RESOLVIDAS
        const productsData = await Promise.all(productDataPromises)

        console.log(productsData)

        let shipping = await CalcShipping(cepDestination)
        
        console.log(`Valor Do Frete e ${shipping}`)

        totalPrice = coupon === "FREESHIP" ? 
          Number(totalPrice.toFixed(2)) : 
          Number((totalPrice + shipping).toFixed(2))

        console.log(`Valor Total e ${totalPrice}`)

        const email = productsData[0].email

        const paymentRequest = PaymentPayload(email, totalPrice)

        const transaction = await payment.create({body: paymentRequest}) 

        const {qrCode, qrCodeBase64, urlPayment} = PaymentLinks(transaction)

        await PaymentService.CreateOrder({idOrder: transaction.id, idUser, productsData, qrCode, qrCodeBase64, urlPayment, totalPrice, cellphone})
            
        return res.status(200).json({message: "Pedido Criado com sucesso", id: transaction.id, qrCode: qrCode, qrCodeBase64: qrCodeBase64, url: urlPayment, totalPrice: totalPrice})

      }catch(err) {

        console.log(err)
        return res.status(500).json({err: err.message})

      }


    }

    async Cancel(req,res) {

      const id = req.params.id;

      try {

        await payment.cancel({ id });
        await PaymentService.CancelOrder(id)
        
        return res.status(200).json({message: "Pedido Cancelado com sucesso"})

      } catch (err) {

        console.log(err)
        return res.status(500).json({err: err.message})

      }

    }

    async Delete(req,res) {

      const id = req.params.id

      try {

        await PaymentService.DeleteOrder(id)

        return res.status(200).json({message: "Pedido Removido com sucesso"})


      }catch(err) {

        return res.status(500).json({err: err.message})

      }

    }

    async Notification(req,res) {

      const {data, action, type} = req.body

      try {

        if(type === "payment" && action == "payment.updated") {

            await PaymentService.PaidOrder(data.id)
            const io = getIo()
            io.emit("payment_success", data.id)
            return res.status(200).json({message: "Pedido Pago com sucesso"})
            
        }

        return res.status(400).json({ message: "Ação ou tipo inválido." });

      }catch(err) {

        console.log(err)
        return res.status(500).json({err: err.message})

      }

    }

    
}

module.exports = new PaymentController();
