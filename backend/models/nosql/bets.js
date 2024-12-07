const mongoose = require("mongoose");
const {UserBetStatusEnum, BetProposalTypeEnum} = require("../enums");

const BetSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        betType: {
            type: String,
            required: true,
            enum: Object.values(BetProposalTypeEnum),
        },
        betProposal: {
            type: mongoose.Schema.Types.ObjectId,  // Relación con una opción específica de apuesta (Winner bets)
            required: true,
            ref: function () {
                return this.betType; // 'this' refers to the document being populated
            }
        },
        amount: {
            type: Number,
            required: true
        },
        odds: {
            type: Number,
            required: true,
            min: 0
        },
        status: {
            type: String,
            enum: Object.values(UserBetStatusEnum), // Usamos el enum para los posibles estados
            default: UserBetStatusEnum.OPEN // Valor por defecto
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Bet", BetSchema);
