const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator.js")

const filterParticipants = (req) => {
    const { participants } = matchedData(req); // Obtenemos los datos ya validados

    // Recorremos cada participante y mantenemos solo el campo `name`
    const filteredParticipants = participants.map(participant => {
        return { name: participant.name };  // Solo conservamos el nombre
    });

    // Modificamos el req para solo incluir los participantes filtrados
    req.body.participants = filteredParticipants;
};

// Función para validar los participantes
const validateParticipants = (participants) => {
    // Recorremos el arreglo de participantes y validamos cada uno
    participants.forEach(participant => {
        if (!participant.participant) {
            throw new Error('Cada participante debe tener un nombre.');
        }
    });
    return true;  // Si todos los participantes son válidos
};

// Middleware para validar la creación de un resultado
const validatorCreateItem = [
    check("resultId")
        .exists().withMessage("The ID field is required.")
        .notEmpty().withMessage("ID cannot be empty.")
        .isMongoId().withMessage("The ID must be a valid MongoDB ObjectId."),
    // Validamos que 'event' es un campo requerido y que debe ser un ID de Mongo válido
    check('participants[*].participantId')
        .isMongoId()
        .withMessage('El campo "participantId" es obligatorio y debe ser un ID válido.'),
    (req, res, next) => validateResults(req, res, next)
];

const validatorGetItem = [
    (req, res, next) => validateResults(req, res, next)
];

module.exports = { validatorCreateItem, validatorGetItem}