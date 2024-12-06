const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const {Users, Basket, Favorites} = require('../models/models')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role, name) => {
    return jwt.sign(
        {id, email, role, name},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, name, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }
        const candidate = await Users.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await Users.create({name, email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const favorites = await Favorites.create({ userId: user.id })
        const token = generateJwt(user.id, user.email, user.role, user.name)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await Users.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role, user.name)
        return res.json({token})
    }

    async auth(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.name)
        return res.json({token})
    }
}

module.exports = new UserController()