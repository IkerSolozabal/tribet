const {printLogs} = require("../utils/handleLogs");

const handleHttpError = (res, error = 'DEFAULT_ERROR', code = 500, description = undefined) => {
    const isPreEnvironment = process.env.NODE_ENV === 'pre';

    // En preproducción, incluye detalles del error; en producción, solo un mensaje genérico
    const response = {};

    response.error = error

    if (isPreEnvironment) {
        response.description = description
    }

    if (description) {
        printLogs(description)
    }

    return res.status(code).send(response);
}

module.exports = {handleHttpError};
