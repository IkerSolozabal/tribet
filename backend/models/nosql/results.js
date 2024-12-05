const mongoose = require('mongoose');
const { ResultStatusEnum } = require("../enums");

const ResultSchema = new mongoose.Schema(
    {
        // Referencia al evento al que pertenece este resultado
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event', // Asume que tienes un modelo 'Event'
            required: true
        },
        participants: [{
            participantId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Participant', // Asume que tienes un modelo 'Participant'
                required: true
            },
            position: {
                type: Number,
                default: null  // El puesto o posición del participante
            },
            time: {
                type: Date,
                default: null  // El tiempo en formato HH:mm:ss
            }
        }],
        status: {
            type: String,
            enum: Object.values(ResultStatusEnum),
            default: ResultStatusEnum.OPEN
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

// Crear y exportar el modelo de Result
const Result = mongoose.model('Result', ResultSchema);
module.exports = Result;