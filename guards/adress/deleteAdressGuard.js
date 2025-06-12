
module.exports = function DeleteAdressGuard(req,res,next) {
   
    const id = req.params.id

    if(req.user.id !== Number(id) ) {

        if(id !== req.user.id) {
        
            if(req.user.admin) {
     
                 return next()
     
            }else {
     
     
             return res.status(403).json({err: "Somente Administradores Podem Remover Endereço De Outros Usuarios!"})
     
            }
         
         }

    }

    return next()

}