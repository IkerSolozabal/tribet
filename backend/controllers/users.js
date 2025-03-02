const {usersModel} = require('../models');
const {handleHttpError} = require('../utils/handleError')
const {matchedData} = require("express-validator");
const {encrypt} = require("../utils/handlePassword");

const getUsers = async (req, res) => {
    try {
        const data = await usersModel.find({});
        res.send({data});
    } catch (e) {
        return handleHttpError(res, 'ERROR_FETCHING_USERS', 500, e);
    }
};

const getUserById = async (req, res) => {
    try {
        req = matchedData(req);
        const {userId} = req;
        const user = await usersModel.findById(userId);
        if (!user) {
            return handleHttpError(res, 'USER_NOT_FOUND', 404);
        }
        res.send({user})
    } catch (e) {
        return handleHttpError(res, 'ERROR_FETCHING_USER_BY_ID', 500, e);
    }
};

const updateUserById = async (req, res) => {
    try {
        const {userId, ...body} = matchedData(req);
        const filter = {_id: userId}

        if (body.password) {
            const passwordHashed = await encrypt(body.password);
            body.password = passwordHashed;
        }
        if (body.email) {
            body.email = body.email.toLowerCase();
        }

        const user = await usersModel.findOneAndUpdate(filter, body, {new: true});

        if (!user) {
            return handleHttpError(res, 'USER_NOT_FOUND', 404);
        }
        user.set("password", undefined, {strict: false});
        res.send({user});
    } catch (e) {
        return handleHttpError(res, 'ERROR_UPDATE_USER_BY_ID', 500, e);
    }
};


const deleteUserById = async (req, res) => {
    try {
        req = matchedData(req);
        const {userId} = req;
        const user = await usersModel.deleteOne({
            _id: userId
        });
        if (!user) {
            return handleHttpError(res, 'USER_NOT_FOUND', 404);
        }
        res.send({user})
    } catch (e) {
        return handleHttpError(res, 'ERROR_DELETE_USER_BY_ID', 500, e);
    }
};

const createUser = async (req, res) => {
    try {
        // Obtener y validar los datos de la solicitud
        const validData = matchedData(req);

        // Encriptar la contraseña
        const passwordHashed = await encrypt(validData.password);

        // Crear el cuerpo del usuario con la contraseña encriptada
        const userData = {...validData, email: validData.email.toLowerCase(), password: passwordHashed};
        // Crear el nuevo usuario en la base de datos
        const newUser = await usersModel.create(userData);

        // Remover la contraseña del objeto antes de enviarlo en la respuesta
        newUser.set("password", undefined, {strict: false});

        // Enviar la respuesta con el usuario creado
        return res.status(201).json({user: newUser});
    } catch (e) {
        return handleHttpError(res, 'ERROR_CREATE_USER', 500, e);
    }
};

const getAccountInfo = async (req, res) => {
    try {
        const {user} = req;
        const accountId = user._id.toString();
        const data = await usersModel.findById(accountId);
        if (!data) {
            return handleHttpError(res, 'ACCOUNT_NOT_FOUND', 404);
        }
        res.send({user: data});
    } catch (e) {
        return handleHttpError(res, 'ERROR_FETCHING_ACCOUNT_INFO', 500, e);
    }
}

module.exports = {getUsers, getUserById, updateUserById, deleteUserById, createUser, getAccountInfo}