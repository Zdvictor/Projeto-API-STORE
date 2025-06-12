const express = require("express")
const router = express.Router()
const passport = require("passport")

const AuthGoogleController = require("../controllers/AuthGoogleController")

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }))
router.get("/auth/google/callback", passport.authenticate("google", {session: false}), AuthGoogleController.googleCallback)

module.exports = router