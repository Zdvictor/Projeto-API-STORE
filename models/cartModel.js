const db = require("../config/database")

const findCart = async (id) => db("cart").select("*").where({id: id}).first()
const getProduct = async (id) => db("cart").select("cart.*", "products.name", "products.price", "products.image").where({id_user: id}).join("products","cart.id_product","=","products.id")
const insertProduct = async(idUser, idProduct, size, qtd) => db.insert({id_user: idUser, id_product: idProduct, size: size, qtd: qtd}).into("cart")
const DeleteProduct = async(id) => db.delete().where({id: id}).from("cart")
const updateProduct = async(id, qtd) => db("cart").update({qtd: qtd}).where({id: id})


module.exports = {findCart, getProduct, insertProduct, updateProduct, DeleteProduct}