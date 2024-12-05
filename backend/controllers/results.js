const { resultModel, participantModel } = require('../models');
const { handleHttpError } = require('../utils/handleError')
const { matchedData } = require("express-validator");
const { ResultStatusEnum } = require("../models/enums");
const { createWinnerBet } = require('../controllers/winnerBets');


// Función para crear un resultado o actualizarlo con nuevos participantes
const createResult = async (eventId, res) => {
    try {
        return await resultModel.create({ event: eventId })
    } catch (error) {
        return handleHttpError(res, 'ERROR_CREATE_RESULT', 500, error);
    }

};

// Función para crear un resultado o actualizarlo con nuevos participantes
const getItems = async (eventId, res) => {
    try {
        const results = await resultModel.find({})
            .populate({
                path: 'event',
                select: 'name' // Solo incluye el campo 'nombre'
            })
            .populate({
                path: 'participants.participantId',
                select: 'name' // Solo incluye el campo 'nombre'
            });
        return res.status(200).json(results);
    } catch (error) {
        return handleHttpError(res, 'ERROR_CREATE_RESULT', 500, e);
    }

};

const diableResult = async (eventId, res) => {
    try {
        const result = await resultModel.findOne({ event: eventId });
        if (result) {
            result.status = ResultStatusEnum.CLOSED; // Actualizas el campo 'status' a 'CLOSED'
            await result.save(); // Guardas el cambio en la base de datos
        }
    } catch (error) {
        return handleHttpError(res, 'ERROR_DISABLE_RESULT', 500, e);
    }
}


// Función para manejar la solicitud de creación del resultado
const createItem = async (req, res) => {
    try {
        req = matchedData(req);  // Validación de los dato
        const result = await createResult(req);
    } catch (e) {
        return handleHttpError(res, 'ERROR_CREATE_RESULT', 500, e);
    }
};


const addParticipants = async (req, res) => {
    try {
        req = matchedData(req);
        const { resultId } = req;
        const existingResult = await resultModel.findById(resultId).populate('participants');
        if (existingResult) {
            if (existingResult.status != ResultStatusEnum.OPEN) {
                return handleHttpError(res, 'RESULT_CLOSED', 404);
            }
            await addParticipantsToResult(existingResult, req.participants, res)
            return await resultModel.findById(resultId).populate('participants');
        } else {
            return handleHttpError(res, 'NO_RESULT_FOUND', 404);
        }
    } catch (error) {
        return handleHttpError(res, 'NO_RESULT_FOUND', 500);
    }

};

async function addParticipantsToResult(req, res) {
    try {
        const { resultId } = req.params;
        const { participants: newParticipants } = req.body;

        // Verifica si el resultado está abierto
        const result = await resultModel.findById(resultId);
        if (!result) {
            return handleHttpError(res, 'RESULT_NOT_FOUND', 404);
        }

        if (result.status !== ResultStatusEnum.OPEN) {
            return handleHttpError(res, 'RESULT_CLOSED', 404);
        }

        // Elimina duplicados de la lista de entrada
        const uniqueParticipantIds = [...new Set(newParticipants.map(p => p.participantId))];

        // Verifica que cada ID pertenezca a un participante existente
        const validParticipants = await participantModel.find({
            _id: { $in: uniqueParticipantIds }
        }).select('_id');

        const validParticipantIds = validParticipants.map(p => p._id.toString());

        // Filtra y encuentra los nuevos participantes que aún no están en el resultado
        const currentParticipantIds = result.participants.map(p => p.participantId.toString());
        const newUniqueParticipantIds = validParticipantIds.filter(id => !currentParticipantIds.includes(id));

        // Si hay nuevos participantes, agrégales y crea apuestas ganadoras para ellos
        if (newUniqueParticipantIds.length > 0) {
            const updatedResult = await resultModel.findByIdAndUpdate(
                resultId,
                {
                    $addToSet: {
                        participants: {
                            $each: newUniqueParticipantIds.map(id => ({ participantId: id }))
                        }
                    }
                },
                { new: true }
            ).populate({
                path: 'participants.participantId',
                select: 'name' // Solo incluye el campo 'nombre'
            });

            // Crea una apuesta ganadora para cada nuevo participante
            for (const participantId of newUniqueParticipantIds) {
                await createWinnerBet(result.event, participantId, res);
            }

            return res.status(200).json(updatedResult);
        } else {
            return res.status(200).json({ message: 'No new participants added' });
        }

    } catch (error) {
        console.error('Error al agregar participantes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { createItem, createResult, addParticipants, diableResult, addParticipantsToResult, getItems }