const jwt = require("jsonwebtoken");
const JWT_SECTRET = process.env.JWT_SECTRET;

const tokenSign = async (user) => {
    try {
        const sign = await jwt.sign(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                balance: user.balance
            },
            JWT_SECTRET,
            {
                expiresIn: "2h"
            }
        )
        return sign
    } catch (error) {
        return null
    }

};

const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECTRET)
    } catch (e) {
        return null
    }
}

module.exports = {tokenSign, verifyToken}
