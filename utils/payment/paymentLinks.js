module.exports = function(transaction) {


    const qrCode = transaction.point_of_interaction.transaction_data.qr_code
    const qrCodeBase64 = transaction.point_of_interaction.transaction_data.qr_code_base64
    const urlPayment = transaction.point_of_interaction.transaction_data.ticket_url

    return {qrCode, qrCodeBase64, urlPayment}

}