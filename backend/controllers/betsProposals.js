const {participantModel, winnerBetModel} = require('../models');
const {handleHttpError} = require('../utils/handleError')
const {matchedData} = require("express-validator");
const {getWinnerBets, getWinnerBetsForEvent} = require('../controllers/winnerBets');

// get a list of all items.
const getBetsProprosals = async (req, res) => {
    try {
        const winnerBets = await getWinnerBets(req, res)
        console.log('WINNER BETS', winnerBets)

        const bets = {
            winnerBets: winnerBets
        }

        res.send(bets)
    } catch (e) {
        return handleHttpError(res, 'ERROR_FETCHING_BET_OPTIONS', 500, e);
    }
};


// Devuelve todas las betOptions para un Id de evento
const getBetsProprosalsForEventId = async (req, res) => {
    try {
        req = matchedData(req);
        const {eventId} = req;

        const winnerBets = await getWinnerBetsForEvent(req, res, eventId)

        const bets = {
            bets: {
                winnerBets: winnerBets
            }
        }
        res.send(bets)

    } catch (e) {
        return handleHttpError(res, 'ERROR_FETCHING_BET_OPTION_BY_ID', 500, e);
    }
};

module.exports = {getBetsProprosals, getBetsProprosalsForEventId}
