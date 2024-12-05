const { betModel, winnerBetModel, usersModel } = require('../models');
const { handleHttpError } = require('../utils/handleError')
const { matchedData } = require("express-validator");
const { BetProposalTypeEnum } = require("../models/enums");
const { populateWinnerBet } = require("../controllers/winnerBets");

// get a list of all items.
const getItems = async (req, res) => {
    try {
        const user = req.user
        const role = user.role

        let data

        if (role.includes('user')) {
            const objectId = user._id; // Suponiendo que el ObjectId está en req.body._id
            const idString = objectId.toString();
            data = await getItemsForUser(idString)
        }

        if (role.includes('admin')) {
            data = await getAllItems()
        }

        res.send({ data })

    } catch (e) {
        return handleHttpError(res, 'ERROR_FETCHING_BETS', 500, e);
    }
};

const getAllItems = async () => {
    return await betModel.find({}).populate('betProposal');
}

const getItemsForUser = async (id) => {
    const filter = {};
    filter.user = id;
    return data = await betModel.find(filter);
}

// get a single item by its ID or a unique identifier.
const getItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        const data = await betModel.findById(id);
        data ? res.send({ data }) : res.status(404).send({ data })
    } catch (e) {
        return handleHttpError(res, 'ERROR_FETCHING_BET', 500, e);
    }
};

// create a new item.
const createItem = async (req, res) => {
    try {
        const user = req.user
        const idString = user._id.toString(); // Suponiendo que el ObjectId está en req.body._id
        req = matchedData(req)

        const { betProposal, betType } = req;
        console.log(betProposal)

        const odds = await getBetOptionOdds(betProposal, betType)

        if (checkBalance(req, user)) {
            if (odds != undefined) {
                const body = {
                    ...req,
                    user: idString,
                    odds: odds,
                    betType: betType
                }

                const data = await betModel.create(body)

                user.balance -= req.amount
                await user.save();

                return res.status(200).send({
                    balance: user.balance,
                    data: data
                });
            }
            return handleHttpError(res, 'INVALID_BET_OPTION', 400);
        } else {
            return handleHttpError(res, 'INSUFICIENT_FUNDS', 403);
        }

    } catch (e) {
        return handleHttpError(res, 'ERROR_CREATE_BET', 500, e);
    }
};

async function getBetOptionOdds(betProposalId, betType) {
    if (betType == BetProposalTypeEnum.WINNER) {
        console.log(betProposalId)
        const data = await winnerBetModel.findById(betProposalId)
        return data.odds
    }
}

const checkBalance = (req, user) => {
    const availableBalance = user.balance
    const amount = req.amount
    return availableBalance >= amount
}

// delete an existing item.
const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id } = req;
        console.log(id)
        const data = await betModel.deleteOne({
            _id: id
        });

        res.send({ data })

    } catch (e) {
        return handleHttpError(res, 'ERROR_DELETE_BET_BY_ID', 500, e);
    }
};

// update an existing item.
const updateItem = async (req, res) => {
    try {
        const { id, ...body } = matchedData(req)
        const filtro = { _id: id }
        const data = await betModel.findOneAndUpdate(filtro, body);
        console.log(data)
        data ? res.send({ data }) : res.status(404).send({ data })
    } catch (e) {
        return handleHttpError(res, 'ERROR_UPDATE_BET_BY_ID', 500, e);
    }
};

// update an existing item.
const getAccountBets = async (req, res) => {
    try {
        const { user } = req;
        console.log(user)
        const accountId = user._id.toString();

        const filter = {};
        filter.user = accountId;

        const winnerBets = await betModel.find(filter)
        .populate('betProposal')
            .populate({
                path: 'user',
                select: 'name' // Solo incluye el campo 'nombre'
            })
            
            const bets = [...winnerBets];
        //const bets = {...winnerBets, ...users}
            
        res.send({bets})
    } catch (e) {
        return handleHttpError(res, 'ERROR_FETCH_BETS', 500, e);
    }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem, getAccountBets }
