const UserService = require("../services/UserService")
const createJWT = require("../utils/jwt/jwt")
class AuthGoogleController {


    async googleCallback(req,res) {

        const user = req.user

        try {

            const dataUser = await UserService.dataUser(user.email)
            
            if(dataUser) {

                const token = createJWT(dataUser)

                res.cookie("token", token, { httpOnly: true, secure: true, sameSite: "strict" })

                console.log(req.cookie.token)

                return res.redirect(`${process.env.FRONTEND_URL}/`)

            }

            
        } catch(err) {

            console.log(err)
            res.cookie("shirtstore_user", JSON.stringify({ name: user.name.familyName, email: user.email }), {
                httpOnly: false,
                secure: true, 
                sameSite: "strict"
              });
            return res.redirect(`${process.env.FRONTEND_URL}/register`)

            
        }


        

    }


}

module.exports =  new AuthGoogleController()