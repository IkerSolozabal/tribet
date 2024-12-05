const { handleHttpError } = require("../utils/handleError");


const checkRole = (permittedRoles) => (req, res, next) => {
    try {
        const { user } = req;

        if (!user || !user.role) {
            return handleHttpError(res, "USER_NOT_AUTHORIZED", 401);
        }

        const hasPermission = permittedRoles.includes(user.role);

        if (!hasPermission) {
            return handleHttpError(res, "USER_NOT_PERMISSIONS", 403);
        }

        next();
    } catch (error) {
        handleHttpError(res, "ERROR_PERMISSIONS", 500, error);
    }
};

module.exports = {checkRole}
