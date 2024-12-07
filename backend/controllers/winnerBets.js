const {winnerBetModel} = require('../models');
const {handleHttpError} = require('../utils/handleError')
const {matchedData} = require("express-validator");
const {ResultStatusEnum} = require("../models/enums");

// Función para agregar participantes a un resultado existente sin duplicarlos
const createWinnerBet = async (eventId, participantId, res) => {
    try {
        const body = {
            event: eventId,
            participant: participantId
        }
        const winnerbet = await winnerBetModel.create(body)
        console.log('NEW WINNER BET', winnerbet)
    } catch (error) {
        return handleHttpError(res, 'ERROR_CREATE_USER', 500, e);
    }
};

// Interfaz
const getWinnerBets = async (req, res) => {
    try {
        const bets = await winnerBetModel.find({})
            .populate({
                path: 'event',
                select: 'name' // Solo incluye el campo 'nombre'
            })
            .populate({
                path: 'participant',
                select: 'name' // Solo incluye el campo 'nombre'
            });
        return bets
    } catch (error) {
        return handleHttpError(res, 'ERROR_GET_WINNER_BETS', 500, error);
    }
};

const getWinnerBetsForEvent = async (req, res, eventId) => {
    try {
        const filter = {};
        filter.event = eventId;
        const bets = await winnerBetModel.find(filter)
            .populate({
                path: 'event',
                select: 'name' // Solo incluye el campo 'nombre'
            })
            .populate({
                path: 'participant',
                select: 'name' // Solo incluye el campo 'nombre'
            });
        return bets
    } catch (error) {
        return handleHttpError(res, 'ERROR_GET_WINNER_BETS', 500, error);
    }
};

module.exports = {createWinnerBet, getWinnerBets, getWinnerBetsForEvent}