


module.exports = function DeleteGuard(req,res,next) {
    
    const {email} = req.body

    if(!email) {
        return res.status(400).json({err: "Dados não enviados"})    
    }

    console.log(email, req.user.email)

    if(email !== req.user.email) {
        
       if(req.user.admin) {

            return next()

       }else {


        return res.status(403).json({err: "Somente Administradores Podem Remover Outros Usuarios!"})


       }
    
    }

    return next()



}