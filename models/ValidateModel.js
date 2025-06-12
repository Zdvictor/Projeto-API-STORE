const db = require("../config/database")


const getCode = (email,code) => db("codesvalidator").select("*").where({email, code}).first()
const dataCode = (code) => db("codesvalidator").select("email", "code", "isUsed").where({code}).first()
const createCode= (email,code) => db("codesvalidator").insert({email,code, isUsed: 0}).where()
const setUsed = (code) => db("codesvalidator").update({isUsed: 1}).where({code})
const deleteCode = (email) => db("codesvalidator").delete().where({email})



module.exports = {getCode, dataCode, createCode, setUsed, deleteCode}