const {matchedData} = require("express-validator");
const {encrypt, check} = require("../utils/handlePassword")
const {usersModel} = require("../models")
const {tokenSign} = require("../utils/handleJwt")
const {handleHttpError} = require("../utils/handleError");

const register = async (req, res) => {
    try {
        // Obtener y validar los datos de la solicitud
        const validData = matchedData(req);

        // Encriptar la contraseña
        const passwordHashed = await encrypt(validData.password);

        // Crear el cuerpo del usuario con la contraseña encriptada
        const userData = {...validData, email: validData.email.toLowerCase(), password: passwordHashed};
        // Crear el nuevo usuario en la base de datos
        const createdUser = await usersModel.create(userData);

        // Remover la contraseña del objeto antes de enviarlo en la respuesta
        createdUser.set("password", undefined, {strict: false});

        // Enviar la respuesta con el usuario creado
        return res.status(201).json({data: createdUser});
    } catch (error) {
        // Manejo de errores
        return handleHttpError(res, 'ERROR_REGISTER_USER', 500, error);
    }
};

const login = async (req, res) => {
    try {
        // Validate and clean the request data
        const validData = matchedData(req);

        // Find the user by email and select relevant fields
        const user = await usersModel.findOne({email: validData.email.toLowerCase()})
            .select('password name role email balance');

        // Check if the user exists
        if (!user) {
            return handleHttpError(res, 'LOGIN_ERROR', 404);
        }

        // Extract the plain password from the request and the hashed password from the user record
        const {password: plainPassword} = validData;
        const hashedPassword = user.get('password');

        // Verify the password
        const isValidPassword = await check(plainPassword, hashedPassword);
        if (!isValidPassword) {
            return handleHttpError(res, 'LOGIN_ERROR', 404);
        }

        // Remove the password field from the user object before sending it in the response
        user.set('password', undefined, {strict: false});

        // Generate a token for the authenticated user
        const token = await tokenSign(user);
        if (!token) {
            return handleHttpError(res, 'TOKEN_GENERATION_FAILED', 500);
        }

        // Prepare the response data
        const responseData = {
            token,
            user
        };

        // Send the response
        return res.status(200).json({data: responseData});
    } catch (error) {
        // Handle unexpected errors
        return handleHttpError(res, 'LOGIN_ERROR', 500, error);
    }
};

module.exports = {register, login}