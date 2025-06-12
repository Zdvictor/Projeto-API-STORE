const CouponsService = require("../services/CouponsService")
const CuponService = require("../services/CouponsService")


class CouponsController {

    async all(req,res) {

        try {

            const coupons = await CuponService.AllCoupons()

            return res.status(200).json(coupons)


        }catch(err) {


            return res.status(500).json({err: err.message})
        }

    }

    async find(req,res) {

        const {name} = req.body

        try {

            await CouponsService.CheckCoupon(name)

            return res.status(200).json({msg: "Cupom Valido"})

        }catch(err) {

            return res.status(500).json({err: err.message})

        }

    }

    async delete(req,res) {

        const {name} = req.body

        try {

            await CouponsService.DeleteCoupon(name)

            return res.status(200).json({msg: "Cupon Deletado"})

        }catch(err) {

            return res.status(500).json({err: err.message})

        }

    }

}


module.exports = new CouponsController()