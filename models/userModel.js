const db = require("../config/database");

const getData = (email) =>
  db("users")
    .select("*")
    .where({ email })
    .first();

const getUsers = () => db("users").select("*");

const getUserById = (id) =>
  db("users").select("*").where({ id }).first();

const getUserByEmail = (email) =>
  db("users").select("*").where({ email }).first();

const createUser = (name, cpf, email, password, birthAt, hasValidated, isGoogle) =>
  db("users").insert({ name, cpf, email, password, birthAt, hasValidated, isGoogle }).returning("*");

const updatePassword = (email, password) => db("users").update({password}).where({email})

const updateUser = (emailAtual, name, birthat) =>
  db("users").update({ name, birthat }).where({ email: emailAtual }).returning("*");

const updateId = (id, {path}) => db("users").update({ image: path }).where({ id });

const updateAdress = (id, idAdress) => db("users").update({ endereco_id: idAdress }).where({ id });

const deleteUser = (email) =>
  db("users").where({ email }).delete();

const validateUser = (email) => db("users").update({ hasValidated: 1 }).where({ email });

module.exports = {
  getData,
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updatePassword,
  updateUser,
  updateId,
  updateAdress,
  deleteUser,
  validateUser
};
