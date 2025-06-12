const getCoordinates = require("./getCoordinates");
const calcDistance = require("./calcDistance");

require("dotenv").config();

module.exports = async function(destinationCep) {

    const originCep = process.env.ORIGIN_CEP

    console.log(originCep, destinationCep)

    try {
        const origin = await getCoordinates(originCep);
        const destination = await getCoordinates(destinationCep);

        const distance = await calcDistance(
          origin.lat,
          origin.lng,
          destination.lat,
          destination.lng
        );

        const priceForKm = 0.2;

        const finalPrice = distance * priceForKm;

        return parseFloat(finalPrice.toFixed(2))

      } catch (err) {

        console.log(err)
        return err


      }


}