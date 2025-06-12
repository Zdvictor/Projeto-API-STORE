const passport = require("passport")
const {Strategy: GoogleStrategy} = require("passport-google-oauth20")
const dotenv = require("dotenv").config()

passport.use(
    
    new GoogleStrategy(
        {

        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,

    }, async(accessToken, refreshToken, profile, done) => {

        const user = {

            id: profile.id,
            name: profile.name,
            email: profile.emails?.[0].value

        }

        return done(null, user)

    }

 )
)

module.exports = passport