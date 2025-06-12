const db = require("../config/database")


const findAll = () => db("coupons").select("*")
const findByName = (name) => db("coupons").select("*").where({name: name}).first()
const deleteByName = (name) => db("coupons").where({name: name}).delete()

module.exports = {findAll, findByName, deleteByName}