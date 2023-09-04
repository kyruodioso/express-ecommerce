const UserModel = require('../models/users.model')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

module.exports = {
    getAll: async function (req, res, next) {
        try {
            const users = await UserModel.find()
            res.json(users);
        } catch (error) {
            next(error)
        }
    },
    create: async function (req, res, next) {
        try {
            const data = new UserModel(req.body)
            const response = await data.save();
            res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    },
    login: async function (req, res, next) {
        try {
            const data = await UserModel.findOne({ email: req.body.email })
            if (!data) {
                return res.json({ message: "validación incorrecta" })
            }
            if (bcrypt.compareSync(req.body.password, data.password)) {
                const token = jwt.sign({ userId: data._id }, req.app.get("secretKey"), { expiresIn: "1h" })
                res.json(token)
            } else {
                return res.json({ message: "validación incorrecta" })
            }
        } catch (error) {
            next(error)
        }
    }
}