
module.exports = function ViewCartGuard(req, res, next) {

    const id = req.params.id

    if(req.user.id !== Number(id)) {

        if(req.user.admin) {

            return next()

        }

        return res.status(403).json({err: "Somente Administradores Podem Vizualar Produtos Do Carrinho de Outros Usuarios!"})

    }

    return next()

}