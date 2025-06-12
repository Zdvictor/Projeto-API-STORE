const db = require("../config/database")

const getCode = (email,code) => db("codespass").select("*").where({email, code}).first()
const dataCode = (code) => db("codespass").select("email", "code", "isUsed").where({code}).first()
const createCode= (email,code) => db("codespass").insert({email,code, isUsed: 0}).where()
const setUsed = (code) => db("codespass").update({isUsed: 1}).where({code})
const deleteCode = (email) => db("codespass").delete().where({email})

module.exports = {getCode, dataCode, createCode, setUsed, deleteCode}