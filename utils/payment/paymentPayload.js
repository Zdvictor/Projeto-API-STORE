module.exports = function(email, price) {

    const payload = {

        transaction_amount: price,
        description: 'Compra de Camisas Oficial Shirt Store',
        payment_method_id: "pix",
        payer: {
        
          email: email

        },
        
      }

    return payload  

}