
module.exports = function DeleteProductCartGuard(req, res, next) {

    const {idUser} = req.body

    if(req.user.id !== Number(idUser)) {

        if(req.user.admin) {

            return next()

        }

        return res.status(403).json({err: "Somente Administradores Podem Remover Produtos ao Carrinho de Outros Usuarios!"})

    }

    return next()

}
