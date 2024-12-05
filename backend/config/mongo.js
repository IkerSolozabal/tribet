const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        const db_uri = process.env.DB_URI;
        await mongoose.connect(db_uri);
        console.log('**** CONEXION CORRECTA ****');
    } catch (error) {
        console.log('**** ERROR EN LA CONEXION ****');
        console.error(error);
    }
}

module.exports = dbConnect;