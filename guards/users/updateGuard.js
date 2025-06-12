

module.exports = function UpdateGuard(req,res,next) {

    const {currentlyEmail} = req.body

    if(!currentlyEmail) {
        return res.status(400).json({err: "Dados não enviados"})    
    }

    console.log(currentlyEmail, req.user.email)

    if(currentlyEmail !== req.user.email) {
        
        if(req.user.admin) {
 
             return next()
 
        }else {
 
 
         return res.status(403).json({err: "Somente Administradores Podem Atualizar Outros Usuarios!"})
 
 
        }
     
     }

     next()

    


}