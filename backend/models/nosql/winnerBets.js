const mongoose = require("mongoose");
const {BetProposalTypeEnum, BetProposalStatusEnum} = require("../enums");

const WinnerBetSchema = new mongoose.Schema(
    {
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event", // Referencia al modelo de Event
            required: true,
        },
        betType: {
            type: String, // Esto usa los valores del enum
            default: BetProposalTypeEnum.WINNER // Establece un valor por defecto
        },
        participant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Participant", // Referencia al modelo de Participant
            required: true,
        },
        odds: {
            type: Number,
            default: 2, // Las cuotas deben ser un número positivo
        },
        status: {
            type: String,
            enum: Object.values(BetProposalStatusEnum), // Usa el enum de BetOptionStatusEnum
            default: BetProposalStatusEnum.ACTIVE // Valor por defecto
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("WinnerBet", WinnerBetSchema);
