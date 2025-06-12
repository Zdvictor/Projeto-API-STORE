const { check, validationResult } = require("express-validator");

// Middleware para validar se o arquivo foi enviado
const checkFileExists = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ err: ["Imagem não encontrada"] })
  }
  next()
}

// Array de middlewares para validação
const uploadPhotoProductValidator = [

  check("id")
    .isNumeric()
    .withMessage("Precisa ser um número"),

  
  checkFileExists,

  
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = errors.array().map((error) => error.msg)
      return res.status(400).json({ err })
    }

    next()
  },
]

module.exports = uploadPhotoProductValidator
