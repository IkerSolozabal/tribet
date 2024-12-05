
const { usersModel } = require('../models');
const { handleHttpError } = require('../utils/handleError')
const { matchedData } = require("express-validator");

const getUsers = async (req, res) => {
    try {
        const data = await usersModel.find({});
        res.send({ data });
    } catch (e) {
        return handleHttpError(res, 'ERROR_FETCHING_USERS', 500, e);
    }
};

const getUserById = async (req, res) => {
    try {
        req = matchedData(req);
        const { userId } = req;
        const data = await usersModel.findById(userId);
        if (!data) {
            return handleHttpError(res, 'USER_NOT_FOUND', 404);
        }
        res.send({ data })
    } catch (e) {
        return handleHttpError(res, 'ERROR_FETCHING_USER_BY_ID', 500, e);
    }
};

const updateUserById = async (req, res) => {
    try {
        const { userId, ...body } = matchedData(req)
        const filtro = { _id: userId }
        const data = await usersModel.findOneAndUpdate(filtro, body);
        if (!data) {
            return handleHttpError(res, 'USER_NOT_FOUND', 404);
        }
        res.send({ data });
    } catch (e) {
        return handleHttpError(res, 'ERROR_UPDATE_USER_BY_ID', 500, e);
    }
};


const deleteUserById = async (req, res) => {
    try {
        req = matchedData(req);

        const { userId } = req;
        const data = await usersModel.deleteOne({
            _id: userId
        });
        if (!data) {
            return handleHttpError(res, 'USER_NOT_FOUND', 404);
        }
        res.send({ data })
    } catch (e) {
        return handleHttpError(res, 'ERROR_DELETE_USER_BY_ID', 500, e);
    }
};

const createUser = async (req, res) => {
    try {
        req = matchedData(req)
        const newUser = await usersModel.create(req)
        res.status(201).send({ newUser });
    } catch (e) {
        return handleHttpError(res, 'ERROR_CREATE_USER', 500, e);
    }
};

const getAccountInfo = async (req, res) => {
    try {
        const { user } = req;
        const accountId = user._id.toString();
        const data = await usersModel.findById(accountId);
        if (!data) {
            return handleHttpError(res, 'ACCOUNT_NOT_FOUND', 404);
        }
        res.send({ data });
    } catch (e) {
        return handleHttpError(res, 'ERROR_FETCHING_ACCOUNT_INFO', 500, e);
    }
}

module.exports = { getUsers, getUserById, updateUserById, deleteUserById, createUser, getAccountInfo }