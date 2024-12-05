const mongoose = require("mongoose");

const ParticipantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        isTeam: {
            type: Boolean,
            required: true
        },
        team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Participant"  // En caso de que sean miembros de un equipo
        }

    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Participant", ParticipantSchema);
