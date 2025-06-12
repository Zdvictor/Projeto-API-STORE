const ReviewService = require("../services/ReviewService")

class ReviewController {

    async all(req,res) {

        try {

            const reviews = await ReviewService.FindAll()

            return res.status(200).json(reviews)

        }catch(err) {

            return res.status(500).json({err: err.message})

        }

    }


    async find(req,res) {

        const { idProduct } = req.params

        try {

            const [reviews, averageStars, stars] = await ReviewService.findById(idProduct)

            return res.status(200).json({reviews, averageStars, stars})


        }catch(err) {

            return res.status(500).json({err: err.message})

        }

    }

    async findBySlug(req,res) {

        const { slug } = req.params

        try {

            const [reviews, averageStars, stars] = await ReviewService.findBySlug(slug)

            return res.status(200).json({reviews, averageStars, stars})

        }catch(err) {

            return res.status(500).json({err: err.message})

        }

    }   

}


module.exports = new ReviewController()