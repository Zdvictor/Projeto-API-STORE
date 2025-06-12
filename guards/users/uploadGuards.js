
module.exports = function UploadGuard(req,res,next) {

    const id = req.params.id

    if(req.user.id !== Number(id) ) {
        
            if(req.user.admin) {
     
                 return next()
     
            }else {
     
     
             return res.status(403).json({err: "Somente Administradores Podem Atualizar Imagens De Outros Usuarios!"})
     
     
            }

    }

    return next()

}