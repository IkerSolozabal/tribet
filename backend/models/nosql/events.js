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
            city: {
                type: String
            },
            venue: {
                type: String
            }
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