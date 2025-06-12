const homeRouter = require("./homeRouter")
const userRouter = require("./userRouter")
const recoveryRouter = require("./recoveryRouter")
const validateRouter = require("./validateRouter")
const adressRouter = require("./adressRouter")
const productsRouter = require("./productsRouter")
const reviewsRouter = require("./reviewRouter")
const authGoogleRouter = require("./authGoogleRouter")
const cartRouter = require("./cartRouter")
const couponsRouter = require("./couponsRouter")
const paymentRouter = require("./paymentRouter")
const shippingRouter = require("./shippingRouter")

module.exports = [

    homeRouter,
    userRouter,
    authGoogleRouter,
    recoveryRouter,
    validateRouter,
    adressRouter,
    productsRouter,
    reviewsRouter,
    cartRouter,
    couponsRouter,
    paymentRouter,
    shippingRouter

]