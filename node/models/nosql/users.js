const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name:{
            type:String
        },
        email: {
            type:String,
            unique:true
        },
        password:{
            type:String,
            select: false
        },
        balance: {
            type: Number,
            default: 0  // Initial balance to 0
        },
        role:{
            type:["user", "admin"],
            default:"user"
        }
    },
    {
        timestamps:true,
        versionKey:false
    }
)

module.exports = mongoose.model("users", UserSchema)