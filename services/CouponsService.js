const CouponsModel = require("../models/couponsModel")

class CouponsSerivce {

    async AllCoupons() {

        const coupons = await CouponsModel.findAll()

        if(coupons.length < 0) throw new Error("Lista de Cupons Vazia")

        return coupons

    }

    async CheckCoupon(name) {

        const coupon = await CouponsModel.findByName(name)

        if(!coupon) throw new Error("Cupon Invalido")

        return true

    }

    async DeleteCoupon(name) {

        await this.CheckCoupon(name)

        await CouponsModel.deleteByName(name)

        return true

    }

}

module.exports = new CouponsSerivce()