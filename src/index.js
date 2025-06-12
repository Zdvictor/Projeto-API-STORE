const express = require("express")
const cors = require("cors")
const http = require("http")
const socketIo = require("socket.io")
const app = express()
const server = http.createServer(app)
const cookieParser = require("cookie-parser")
const passport = require("../config/passport")
const socketManager = require("../utils/socket/socketManager")

const path = require("path")

app.use(cors({

    origin: `${process.env.FRONTEND_URL}`,
    credentials: true

}))


app.use(cookieParser())

app.use("/uploads", express.static(path.join(__dirname, "../uploads")))

app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.use(passport.initialize())

//CONFIGURAR SOCKET IO
const io = socketIo(server)

const Routes = require("../routes/routes")

Routes.forEach((route) => {
    
    app.use(route)

})

socketManager.init(server)

module.exports = {server, io}