const moment = require("moment-timezone")
moment.locale("momente/locale/pt-br")

module.exports = function(data) {

    return moment.utc(data).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss').split(" ")[0]

}