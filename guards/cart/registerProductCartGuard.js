
module.exports = function RegisterProductCartGuard(req, res, next) {

    const {idUser} = req.body

    console.log("Passou aqui no middleware de update guard")
    console.log(idUser)

    if(req.user.id !== Number(idUser)) {

        if(req.user.admin) {

            return next()

        }

        return res.status(403).json({err: "Somente Administradores Podem Adicionar Produtos ao Carrinho de Outros Usuarios!"})

    }

    return next()

}