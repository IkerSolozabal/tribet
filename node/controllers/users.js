
const {usersModel} = require('../models');
const {handleHttpError} = require('../utils/handleError')
const {matchedData} = require("express-validator");

const getItems = async (req, res) => {
    try {
        const data = await usersModel.find({});
        res.send({data})
    } catch (e) {
        const errorDetails = err.array()
        handleHttpError(res, 'Error fetching user list', 500, error);
    }
};

const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await usersModel.findById(id);
        res.send({data})
    } catch (e) {
        const errorDetails = err.array()
        handleHttpError(res, 'Error fetching item', 500, errorDetails);
    }
};

const updateItem = async (req, res) => {
    try {
        const {id, ...body} = matchedData(req)
        const filtro = {_id: id}
        const data = await usersModel.findOneAndUpdate(filtro, body);
        res.send({data});
    } catch (e) {
        const errorDetails = err.array()
        handleHttpError(res, 'Error updating item', 500, errorDetails);
    }
};


const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);
       
        const {id} = req;
        console.log(id)
        const data = await usersModel.deleteOne({
            _id: id
        });
        
        res.send({data})
    } catch (e) {
        handleHttpError(res, 'Error deleting item', 500, errorDetails);
    }
};

module.exports = {getItems, getItem, updateItem, deleteItem}