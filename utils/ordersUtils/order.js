const moment = require('moment-timezone');
require('moment/locale/pt-br');
moment.locale('pt-br'); 


module.exports = function (orders) {

    let newObj = []

    orders.forEach(data => {

        newObj.push(
            
            {   

            Order: {
                Status: {

                    id: data.id,
                    paid: Number(data.isPaid),
                    totalPrice: Number(data.total_price),
                    date:  moment.utc(data.created_at).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss')

                },

                User: {

                    id: data.id_user,
                    name: data.name,
                    cpf: data.cpf,
                    email: data.email,
                    cellphone: data.cellphone

                },

                Adress: {

                    id: data.endereco_id,
                    number: Number(data.numero),
                    neighborhood: data.bairro,
                    street: data.rua,
                    city: data.cidade,
                    state: data.estado,
                    cep: data.cep

                },

                Product: {

                    id: data.id_product,
                    name: data.nome_produto,
                    price: Number(data.preço_produto),
                    description: data.descrição_produto,
                    img: data.image,
                    size: data.size,
                    qtd: data.qtd

                },

                Link: {

                    url: data.url_payment

                }
            }
        }
    )
    })

    return newObj



}