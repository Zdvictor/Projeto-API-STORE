
const knex = require("knex")
const knexconfig = require("../knexfile")

const environment = process.env.NODE_ENV || "development"
const db = knex(knexconfig[environment])

module.exports = db