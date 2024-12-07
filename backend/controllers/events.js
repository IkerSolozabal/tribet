const {eventModel, betModel, betOptionsModel, usersModel} = require('../models');
const {handleHttpError} = require('../utils/handleError')
const {matchedData} = require("express-validator");
const {setStatus, setWinner, Status, checkBets} = require("../utils/handleEvent");
const {EventStatusEnum} = require("../models/enums");
const {createResult, diableResult} = require('../controllers/results');

const getEvents = async (req, res) => {
    try {
        const allowedStatus = [Object.values(EventStatusEnum)];

        const {status} = req.query;
        const {city} = req.query;

        const filter = {};

        if (status != undefined) {
            if (!allowedStatus.includes(status)) {
                return handleHttpError(res, 'INVALID_STATUS', 400, `Invalid status value. Must be ${Object.values(EventStatusEnum)}`);
            }

            filter.status = status;
        }

        if (city != undefined) {
            filter["location.city"] = city;
        }

        const events = await eventModel.find(filter);

        res.send({events});
    } catch (e) {
        return handleHttpError(res, 'ERROR_FETCHING_EVENTS', 500, e);
    }
};

const getEventById = async (req, res) => {
    try {
        req = matchedData(req);
        const {eventId} = req;
        const event = await eventModel.findById(eventId);
        event ? res.send({event}) : handleHttpError(res, 'EVENT_NOT_FOUND', 404);
    } catch (e) {
        return handleHttpError(res, 'ERROR_FETCHING_EVENT', 500, e);
    }
};

// create a new item.
const createEvent = async (req, res) => {
    try {
        req = matchedData(req)

        const event = await eventModel.create(req)

        // Crea un result con 0 participants y asociado al evento
        const eventId = event._id.toString()
        const result = await createResult(eventId, res);

        res.status(201).send({event, result});
    } catch (e) {
        return handleHttpError(res, 'ERROR_CREATE_EVENT', 500, e);
    }
};

// delete an existing item.
const deleteEventById = async (req, res) => {
    try {
        req = matchedData(req);
        const {eventId} = req;
        const event = await eventModel.deleteOne({_id: eventId});
        await diableResult(eventId, res)
        res.send({event})
    } catch (e) {
        return handleHttpError(res, 'ERROR_DELETE_EVENT_BY_ID', 500, e);
    }
};

// update an existing item.
const updateEventById = async (req, res) => {
    try {
        const {eventId, ...body} = matchedData(req)
        const filtro = {_id: eventId}
        const event = await eventModel.findOneAndUpdate(filtro, body);
        event ? res.send({event}) : handleHttpError(res, 'EVENT_NOT_FOUND', 404);
    } catch (e) {
        return handleHttpError(res, 'ERROR_UPDATE_EVENT_BY_ID', 500, e);
    }
};

// create a new item.
const addEventResult = async (req, res) => {
    try {
        req = matchedData(req);
        const {id} = req; // ID del evento desde la URL
        const {winner} = req; // Obtener el ganador y la posición del cuerpo de la solicitud

        // Buscar el evento por ID
        const event = await eventModel.findById(id);

        if (!event) {
            return handleHttpError(res, 'EVENT_NOT_FOUND', 404);
        }

        event.status = 'finished';

        setStatus(event, Status.FINISHED)

        // Agregar el resultado al evento
        setWinner(event, winner)

        // Guardar el evento actualizado
        await event.save();

        await checkBets()

        // Paso 4: Comprobar todas las apuestas para el evento


        res.status(200).json({message: 'Event result updated successfully', event});
    } catch (error) {
        return handleHttpError(res, 'ERROR_UPDATE_RESULT_EVENT_BY_ID', 500, e);
    }
};


module.exports = {getEvents, getEventById, createEvent, updateEventById, deleteEventById, addEventResult}