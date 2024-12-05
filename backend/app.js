require("dotenv").config()
const { printLogs } = require("./utils/handleLogs");
const express = require("express")
const cors = require("cors")
const app = express()
const dbConnect = require('./config/mongo')


app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3000

// Mount all dynamic routes from 'routes/index.js' under the '/api' prefix.
// For example, a 'users.js' file in 'routes' will be accessible via '/api/users'.
app.use("/api", require("./routes"))


app.listen(port, () => {
    printLogs(`Tu app esta lista en: http://localhost:${port}`)
})

dbConnect()