const mongoose = require("mongoose");
const { UserRolesEnum } = require("../enums");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            unique: true,
            require: true
        },
        password: {
            type: String,
            select: false,
            require: true
        },
        balance: {
            type: Number,
            default: 200, // Initial balance to 200
            require: true
        },
        role: {
            type: String,
            enum: Object.values(UserRolesEnum),
            default: UserRolesEnum.USER,
            require: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

module.exports = mongoose.model("User", UserSchema)