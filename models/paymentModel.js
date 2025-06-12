const db = require("../config/database")

const findOrderById = (idOrder) => db("orders").where("id_order", idOrder).first()
const findAll = (idUser) =>
  db("orders")
    .join("users", "orders.id_user", "=", "users.id")
    .join("products", "orders.id_product", "=", "products.id")
    .join("endereco", "users.endereco_id", "=", "endereco.id")
    .select(
      "orders.*",
      "users.name",
      "users.cpf",
      "users.email",
      "users.endereco_id",
      "endereco.numero",
      "endereco.bairro",
      "endereco.rua",
      "endereco.cidade",
      "endereco.estado",
      "endereco.cep",
      "products.name as nome_produto",
      "products.price as preço_produto",
      "products.description as descrição_produto",
      "products.image as image"
    )
    .where("users.id", idUser);

const createOrder = (idOrder, idUser,idProduct, size, qtd, qrCode, qrCodeBase64, urlPayment, totalPrice, cellphone, trx) => {

  const query = db("orders").insert({

    id_user: idUser,
    id_product: idProduct,
    id_order: idOrder,
    size: size,
    qtd: qtd,
    isPaid: 0,
    qr_code: qrCode,
    qr_code_base_64: qrCodeBase64,
    url_payment: urlPayment,
    total_price: totalPrice,
    cellphone: cellphone


  })

  return trx ? query.transacting(trx) : query

}

const paidOrder = (idOrder) => db("orders").update({isPaid: 1}).where({id_order: idOrder})
const cancelOrder = (idOrder) => db("orders").update({isPaid: 2}).where({id_order: idOrder})
const deleteOrder = (idOrder) => db("orders").delete().where({id_order: idOrder})


module.exports = {findOrderById, findAll,createOrder, paidOrder, cancelOrder, deleteOrder}

