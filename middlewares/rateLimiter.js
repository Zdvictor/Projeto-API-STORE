const rateLimit = require("express-rate-limit")

const apiLimiter = rateLimit({

    windowMS: 1000 * 60 * 5,
    max: 10,
    message: {

        status: 429,
        err: "Muitas tentativas, tente novamente mais tarde"

    },
    standardHeaders: true,
    legacyHeaders: false,

})

module.exports = apiLimiter