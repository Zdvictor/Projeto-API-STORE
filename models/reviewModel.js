const db = require("../config/database")


const findAll = () => db("reviews").select("reviews.*", "users.name as name", "users.image as image").join("users", "reviews.id_user", "=", "users.id")
const findOne = (idProduct) => db("reviews").select("reviews.*", "users.name as name", "users.image as image").join("users", "reviews.id_user", "=", "users.id").where({id_product: idProduct})
const findStars = (idProduct) => db("reviews").where({id_product: idProduct}).avg("stars as average_stars").first()
const findAverage = (idProduct) => db("reviews").select("stars").count("stars as count").where({id_product: idProduct}).avg("stars as average_stars").groupBy("stars")
const create = (data) => db("reviews").insert(data)
const remove = (id) => db("reviews").delete().where({id})



module.exports = {findAll, findOne, findStars, findAverage, create, remove}