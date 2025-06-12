const axios = require("axios")

class ShippingController {

    //REFATOAR AQUI EM BREVE COM API DOS CORREIOS OFICIAL
    async shipping(req, res) {

        const url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo'
    
          try {
    
            const response = await axios.get(url, {params: req.query})

            console.log(response.data)
            console.log("Pasosu aqui")

            return res.status(200).send(response.data)
    
    
    
          }catch(err) {
    
            console.log(err)
            return res.status(500).json({err: err.message})
    
          }

    }


}

module.exports = new ShippingController()