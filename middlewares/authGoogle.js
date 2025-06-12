const { randomUUID } = require("crypto")

module.exports = function AuthGoogleMiddleware(req,res,next) {

    

    if(req.body.password === "registerByGoogle123.") {

        req.body.password = randomUUID().slice(0,6)
        req.body.hasValidated = true
        req.body.isGoogle = true

        

    }else {

        req.body.hasValidated = false
        req.body.isGoogle = false


    }

    next()



}