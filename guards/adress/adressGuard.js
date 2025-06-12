
module.exports = function AdressGuard(req,res,next) {
   
    const id = req.body.id
    
    if(req.user.id !== Number(id) ) {

        if(id !== req.user.id) {
        
            if(req.user.admin) {
     
                 return next()
     
            }else {
     
     
             return res.status(403).json({err: "Somente Administradores Podem Adicionar Endereço De Outros Usuarios!"})
     
     
            }
         
         }

    }

    return next()

}