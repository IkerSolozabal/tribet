const {verifyToken} = require("../utils/handleJwt");
const {usersModel} = require('../models');
const {handleHttpError} = require("../utils/handleError");

// Middleware function for authentication
const authMiddleware = async (req, res, next) => {
    try {
        // Check if the Authorization header is present
        if (!req.headers.authorization) {
            return handleHttpError(res, 'NOT_SESSION_FOUND', 401); // Return error if no authorization header is found
        }

        // Extract the token from the Authorization header (usually in the form "Bearer token")
        const token = req.headers.authorization.split(' ').pop();
        console.log(token)
        // Verify the token (assumes verifyToken is an async function returning the token data or null/undefined on failure)
        const dataToken = await verifyToken(token);
        console.log(dataToken)

        // If the token is invalid or verification failed, return an error
        if (!dataToken) {
            return handleHttpError(res, 'ERROR_SESSION_TOKEN', 401); // Unauthorized due to token error
        }

        // Retrieve the user associated with the decoded token (assumes dataToken contains user information)
        const user = await usersModel.findById(dataToken._id);

        // If user is not found (can be an edge case if the token is valid but user was deleted), return an error
        if (!user) {
            return handleHttpError(res, 'USER_NOT_FOUND', 404); // Not found, user doesn't exist
        }

        // Attach the user object to the request for downstream middleware or routes to use
        req.user = user;

        // Call the next middleware in the stack
        next();
    } catch (e) {
        // If any error occurs during the process, return a general error with status 500
        return handleHttpError(res, 'ERROR_CHECK_TOKEN', 500, e); // Internal server error, includes the error message
    }
}


module.exports = {authMiddleware}