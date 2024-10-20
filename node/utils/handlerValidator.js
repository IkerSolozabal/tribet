const {validationResult} = require("express-validator")
const {handleHttpError} = require('../utils/handleError')

const validateResults = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (err) {
        // Use the error handler to manage the response
        handleHttpError(res, 'Validation error in the request data', undefined, 400, err);
    }
}

module.exports = validateResults