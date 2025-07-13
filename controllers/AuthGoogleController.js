const UserService = require("../services/UserService")
const createJWT = require("../utils/jwt/jwt")
class AuthGoogleController {


    async googleCallback(req,res) {

        const user = req.user

        try {

            const dataUser = await UserService.dataUser(user.email)
            
            if(dataUser) {

                const token = createJWT(dataUser)

                res.cookie("token", token, { 
                    httpOnly: true, 
                    secure: true, 
                    sameSite: "none" 
                });

                console.log(req.cookies.token)

                return res.redirect(`${process.env.FRONTEND_URL}/`)

            }

            
        } catch(err) {

            return res.redirect(`${process.env.FRONTEND_URL}/register?name=${encodeURIComponent(user.name.familyName)}&email=${encodeURIComponent(user.email)}`);

            
        }


        

    }


}

module.exports =  new AuthGoogleController()