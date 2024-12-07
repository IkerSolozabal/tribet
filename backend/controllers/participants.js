const {participantModel} = require('../models');
const {handleHttpError} = require('../utils/handleError')
const {matchedData} = require("express-validator");

// get a list of all items.
const getItems = async (req, res) => {
    try {
        const {isTeam} = req.query;

        // Crea un objeto de filtro basado en los parámetros de consulta
        const filter = {};

        // Solo agrega isTeam al filtro si se proporciona en la consulta
        if (isTeam !== undefined) {
            filter.isTeam = isTeam === 'true'; // Convertir a booleano
        }

        // Busca los participantes con el filtro
        const data = await participantModel.find(filter).populate({
            path: 'team',
            select: 'name' // Solo incluye el campo 'nombre'
        });

        // Responde con los datos obtenidos
        res.send({data});
    } catch (e) {
        return handleHttpError(res, 'ERROR_FETCHING_PARTICIPANTS', 500, e);
    }
};

// get a single item by its ID or a unique identifier.
const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const {id} = req;

        // Buscar el participante por ID
        const data = await participantModel.findById(id);

        let response = {
            data // Aquí tienes el participante
        };
        // Si el participante no existe, enviar un 404
        if (!data) {
            return handleHttpError(res, 'PARTICIPANT_NOT_FOUND', 404);
        }

        // Si el participante es un equipo, poblar los miembros del equipo
        if (data.isTeam) {
            const participants = await participantModel.find({team: id}).select('name');
            response.players = participants
        }
        res.status(200).send(response);
    } catch (e) {
        return handleHttpError(res, 'ERROR_FETCHING_PARTICIPANT', 500, e);
    }
};

// create a new item.
const createItem = async (req, res) => {
    try {
        req = matchedData(req)
        const newEvent = await participantModel.create(req)
        res.status(201).send({newEvent});
    } catch (e) {
        return handleHttpError(res, 'ERROR_CREATE_PARTICIPANT', 500, e);
    }
};

// delete an existing item.
const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        console.log(id)
        const data = await participantModel.deleteOne({
            _id: id
        });

        res.send({data})
    } catch (e) {
        return handleHttpError(res, 'ERROR_DELETE_PARTICIPANT_BY_ID', 500, e);
    }
};

// update an existing item.
const updateItem = async (req, res) => {
    try {
        const {id, ...body} = matchedData(req)
        const filtro = {_id: id}
        const data = await participantModel.findOneAndUpdate(filtro, body);
        data ? res.send({data}) : res.status(404).send({data})
    } catch (e) {
        const errorDetails = err.array()
        return handleHttpError(res, 'ERROR_UPDATE_PARTICIPANT_BY_ID', 500, e);
    }
};


module.exports = {getItems, getItem, createItem, updateItem, deleteItem}