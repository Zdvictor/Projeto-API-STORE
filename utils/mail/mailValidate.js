const nodemailer = require("nodemailer")

module.exports =  function mailerValidate(name,email,validationCode) {


        const createTransport =  nodemailer.createTransport({

            service: "gmail",
            auth: {

                user: "victor.zaidir@gmail.com",
                pass: "ntbx jvjb zkdu zfcn"

            }

        })

        const mailOptions = {

            from: "Shirt Store <victor.zaidir@gmail.com>",
            to: email,
            subject: "Validação de Conta - Shirt Store",
            html: `


                <div style="background-color: #f8f9fa; padding: 20px; font-family: Arial, sans-serif; text-align: center; border: 1px solid #ddd; border-radius: 8px;">
                    <h1 style="color: #333; margin-bottom: 20px;">Validação de Conta</h1>
                    <p style="color: #555; font-size: 16px; margin-bottom: 20px;">Olá, <strong>${name}</strong>,</p>
                    <p style="color: #555; font-size: 16px; margin-bottom: 20px;">
                        Seja bem-vindo(a) à <strong>Shirt Store</strong>! Estamos felizes em tê-lo(a) conosco.
                    </p>
                    <p style="color: #555; font-size: 16px; margin-bottom: 20px;">
                        Para completar seu cadastro, use o código abaixo para validar sua conta:
                    </p>
                    <h2 style="background-color: #4CAF50; color: white; padding: 10px 20px; display: inline-block; border-radius: 4px;">
                        ${validationCode}
                    </h2>
                    <p style="color: #555; font-size: 16px; margin-top: 20px;">
                        Se você não realizou este cadastro, por favor, ignore este e-mail.
                    </p>
                    <p style="color: #555; font-size: 16px; margin-top: 40px;">Atenciosamente,</p>
                    <p style="color: #333; font-size: 18px; font-weight: bold;">Equipe Shirt Store</p>
                    <p style="color: #777; font-size: 14px; margin-top: 10px;">
                        Este é um e-mail automático. Por favor, não responda.
                    </p>
                </div>



            


            `
        }


         createTransport.sendMail(mailOptions, function(err, info) {

            if(err) {

                console.log("ERRO " + err)

            }else {

                // console.log("Email Sent " + info.response)

            }

        })

    }