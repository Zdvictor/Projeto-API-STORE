
module.exports = function ViewPayments(req, res, next) {

    const {idUser} = req.body

    if(req.user.id !== Number(idUser)) {

        if(req.user.admin) {

            return next()

        }

        return res.status(403).json({err: "Somente Administradores Podem Vizualizar Pagamentos de Outros Usuarios!"})

    }

    return next()

}
