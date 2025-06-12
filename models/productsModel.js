const path = require("path")
const db = require("../config/database")

const getAllProducts = () => db("products").select("*")
const getAllOffers = () => db("bestoffers").select("*").join("products", "bestoffers.id_product", "=", "products.id")
const getAllLendarys = () => db("lendaryjerseys").select("*").join("products", "lendaryjerseys.id_product", "=", "products.id")
const getProduct = (id) => db("products").select("*").where({id: id}).first()
const getProductBySlug = (slug) => db("products").select("*").where({slug: slug}).first()
const registerProduct = (name,description,price) => db("products").insert({name,description,price}).returning("id")
const uploadPhoto = (id, path) => db("products").update({image: path}).where({id})
const editProduct = (id, name,description,price) => db("products").update({name,description,price}).where({id})
const deleteProduct = (id) => db("products").delete().where({id})

module.exports = {getAllProducts, getAllOffers, getAllLendarys, getProduct, getProductBySlug, registerProduct, uploadPhoto, editProduct, deleteProduct}