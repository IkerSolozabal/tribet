const { matchedData } = require("express-validator");
const { encrypt, check } = require("../utils/handlePassword")
const { usersModel } = require("../models")
const { tokenSign } = require("../utils/handleJwt")
const { handleHttpError } = require("../utils/handleError");

const register = async (req, res) => {
    try {
        req = matchedData(req)
        const passwordHashed = await encrypt(req.password)
        const body = { ...req, password: passwordHashed }
        const dataUser = await usersModel.create(body)
        dataUser.set("password", undefined, { strict: false })
        const data = {
            user: dataUser
        };
        res.status(201).send({data});
    } catch (e) {
        handleHttpError(res, 'Error on register user', undefined, 404, e);
    }
}

const login = async (req, res) => {
    try {
        req = matchedData(req);
        const user = await usersModel.findOne({
            email: req.email
        }).select('password name role email balance')
        if (!user) {
            let customErrorMsg = "User does not exist"
            handleHttpError(res, 'Login error', customErrorMsg, 404);
            return
        }
        const plainPassword = req.password
        const hashedPassword = user.get('password')
        const isValidPassword = await check(plainPassword, hashedPassword)
        if (!isValidPassword) {
            let customErrorMsg = "Invalid Password"
            handleHttpError(res, 'Login error', customErrorMsg, 404);
            return
        }

        user.set('password', undefined, { strict: false })

        const token = await tokenSign(user);

        if (!token) {
            //console.log(user)
            handleHttpError(res, 'Token generation failed', undefined, 500);
            return
        }

        //console.log(token)
        const data = {
            token: token,
            user
        }

        res.send({ data })
    } catch (e) {
        handleHttpError(res, 'Error with login', undefined, 500, e);
        return
    }

}

module.exports = { register, login }