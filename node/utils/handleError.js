const handleHttpError = (res, message = 'ERROR', customMsg = undefined, code = 500, error = undefined) => {
    const isPreEnvironment = process.env.NODE_ENV === 'pre';

    // En preproducción, incluye detalles del error; en producción, solo un mensaje genérico
    const response = {
        error: message
    };

    if (isPreEnvironment && customMsg) {
        response.details = customMsg; // Solo en pre, muestra detalles adicionales
    }

    if (error) {
        console.log('****************************');
        console.log(error);
        console.log('****************************');
    }

    res.status(code).send(response);
}

module.exports = { handleHttpError };
