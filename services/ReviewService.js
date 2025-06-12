const ReviewModel = require("../models/reviewModel")
const ProductsModel = require("../models/productsModel")
const FormatData = require("../utils/data/format")

const moment = require('moment-timezone');
require('moment/locale/pt-br');

moment.locale('pt-br');

class ReviewService {

    async FindAll() {

        const reviews = await ReviewModel.findAll()

        return reviews

    }

    async findById(idProduct) {

        const existProduct = await ProductsModel.getProduct(idProduct)

        if(!existProduct) throw new Error("Produto Não Encontrado")

        const reviews = await ReviewModel.findOne(idProduct)

        let stars = await ReviewModel.findStars(idProduct)

        stars = Number(stars.average_stars)

        const average = await ReviewModel.findAverage(idProduct)

        const totalReviews = average.reduce( (sum, average) => sum + average.count, 0)

        const averageStars = average.map( (review) => ({
 
            stars:  review.stars,
            percentage: ( (review.count / totalReviews) * 100).toFixed(2)
        }))

        reviews.map((review) => {

            review.created_at = moment.utc(review.created_at).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss').split(" ")[0]
            review.updated_at = moment.utc(review.updated_at).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss').split(" ")[0]

        })


        return [reviews, averageStars, stars]
        

    }

    async findBySlug(slug) {

        const existProduct = await ProductsModel.getProductBySlug(slug)

        if(!existProduct) throw new Error("Produto Não Encontrado")

        const reviews = await ReviewModel.findOne(existProduct.id)

        let stars = await ReviewModel.findStars(existProduct.id)

        stars = Number(stars.average_stars)

        const average = await ReviewModel.findAverage(existProduct.id)

        const totalReviews = average.reduce( (sum, average) => sum + average.count, 0)

        const averageStars = average.map( (review) => ({
 
            stars:  review.stars,
            percentage: ( (review.count / totalReviews) * 100).toFixed(2)
        }))

        reviews.map((review) => {

            review.created_at = moment.utc(review.created_at).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss').split(" ")[0]
            review.updated_at = moment.utc(review.updated_at).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss').split(" ")[0]

        })


        return [reviews, averageStars, stars]
    }

}


module.exports = new ReviewService()