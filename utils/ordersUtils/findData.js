
module.exports = function (user, product) {

    const data = {

        email: user.email,
        product: {

            price: Number(product.price),
            description: product.description
        }
    }

    return data
}