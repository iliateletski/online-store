const{Basket, BasketDevice} = require('../models/models')
const ApiError = require('../error/ApiError')

class BasketController {
    
    async getBasket(req, res) {
        const{userId} = req.query
        const basket = await Basket.findOne({where: {userId}})
        return res.json(basket)
    }

    async add(req, res, next) {
        try {
            let {basketId, deviceId} = req.body
            const basketDevice =  await BasketDevice.create({basketId, deviceId})
            return res.json(basketDevice)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res) {
        if('id' in req.body) {
            const{checked, id} = req.body
            const basketDevice = await BasketDevice.update({checked}, {where:{id}})
            return res.json(basketDevice)
        }

        if('basketId' in req.body){
            const{checked, basketId} = req.body
            const basketDevice = await BasketDevice.update({checked}, {where:{basketId}})
            return res.json(basketDevice)
        }
    }

    async getAll(req, res) {
        const{basketId} = req.params
        const basketDevice = await BasketDevice.findAndCountAll({where:{basketId}, order: [['createdAt', 'DESC'],]})
        return res.json(basketDevice) 
    }

    async getOne(req, res) {
        const{id} = req.query
        const basketDevicce = await BasketDevice.findOne({where:{id}})
        return res.json(basketDevicce)
    }

    async remove(req, res) {
        const{id} = req.body
        if(typeof(id) !== 'number'){
            const arrId = JSON.parse(id)

            arrId.forEach(id => {
                BasketDevice.destroy({where:{deviceId: id}})
            });
            return res.json([1]);
        }
        const basketDevicce = await BasketDevice.destroy({where:{id}})
        return res.json(basketDevicce)
    } 

}

module.exports = new BasketController()