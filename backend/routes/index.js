const express = require("express");
const fs = require("fs");
const router = express.Router();

const PATH_ROUTES = __dirname

const removeExt = (filename) => {
    return filename.split('.').shift();
}

// Read all files from the 'routes' folder and dynamically register
// routes based on the file names (excluding file extensions).
// If the file is not 'index.js', create a route with the file name.
fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExt(file) // Remove file extension
    if (name !== 'index') {
        // Dynamically register the route using the file name
        router.use(`/${name}`, require(`./${file}`))
    }
})

module.exports = router;