const db = require("../config/database")


const getAllAdress = () => db("endereco").select("*")
const getAdressById = (id) => db("endereco").select("*").where({id: id}).first()
const AddAdress = (num,neigh,street,city,state,cep) => db("endereco").insert({numero: num, bairro: neigh, rua: street, cidade: city, estado: state, cep: cep}).returning("id")
const updateAdress = (idAdress, num, neigh, street, city, state, cep) => db("endereco").update({ numero: num, bairro: neigh, rua: street, cidade: city, estado: state, cep: cep }).where({ id: idAdress })
const deleteAdress = (idAdress) => db("endereco").delete().where({id: idAdress})


module.exports = {getAllAdress, getAdressById,AddAdress, updateAdress, deleteAdress}