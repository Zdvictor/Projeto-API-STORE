

module.exports = function AdminMiddleware(req,res,next) {

    const idAdm = 123

    if(req.user.id !== idAdm) {

        return res.status(403).json({err: "Somente Administradores Podem Registrar Novos Produtos!"})

    }

    next()

}