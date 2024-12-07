const bcryptjs = require('bcryptjs')

const encrypt = async (plainPassword) => {
    return await bcryptjs.hash(plainPassword, 5);
}

const check = async (plainPassword, hash) => {
    return await bcryptjs.compare(plainPassword, hash);
}

module.exports = {encrypt, check}