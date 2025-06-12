
module.exports = {

    development: {

        client: "mysql2",

        connection: {

            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            timezone: "-03:00"
        

        },

        pool: {

            min: 2,
            max: 10

        },

        migrations: {
            directory: './src/database/migrations'
          },
          seeds: {
            directory: './src/database/seeds'
          }

    },
    

}


//Usuar para o Clever Mysql Pois la a hora tem problema
// timezone: 'America/Sao_Paulo'