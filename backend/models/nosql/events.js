const mongoose = require("mongoose");
const {EventTagsEnum, EventStatusEnum} = require("../enums");

const EventSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        startDate: {
            type: Date,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        tags: {
            type: [String],
            enum: Object.values(EventTagsEnum),
            required: false
        },
        status: {
            type: String,
            enum: Object.values(EventStatusEnum),
            default: EventStatusEnum.SCHEDULED
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model("Event", EventSchema);